
-- Create pricing plans table
create table public.pricing_plans (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    price numeric,
    base_price numeric,
    period text,
    description text,
    promotion text,
    savings text,
    volume_discount text,
    is_highlighted boolean default false,
    is_promo boolean default false,
    is_best_value boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create pricing features table
create table public.pricing_features (
    id uuid primary key default gen_random_uuid(),
    plan_id uuid references public.pricing_plans(id) on delete cascade,
    feature text not null,
    created_at timestamptz default now()
);

-- Create pricing tiers table
create table public.pricing_tiers (
    id uuid primary key default gen_random_uuid(),
    plan_id uuid references public.pricing_plans(id) on delete cascade,
    tier_description text not null,
    api_calls_min integer,
    api_calls_max integer,
    price_per_call numeric,
    created_at timestamptz default now()
);

-- Insert default pricing plans
insert into public.pricing_plans 
(name, price, period, description, promotion, volume_discount, is_highlighted, is_promo)
values
(
    'Pay As You Go',
    0.002,
    'per API call',
    'Start with zero commitment and scale as you grow',
    'First 10,000 API calls free',
    'Pay only for what you use',
    false,
    true
),
(
    'Growth',
    0.001,
    'per API call',
    'Perfect for scaling businesses with consistent volume',
    '50% off standard rate',
    '$1,000 monthly minimum',
    true,
    true
),
(
    'Enterprise',
    null,
    'annual contract',
    'Tailored solutions for large-scale operations',
    null,
    'Volume-based custom pricing',
    false,
    false
);

-- Create function to update user plan
create or replace function public.update_user_plan(
    p_user_id uuid,
    p_plan_id uuid
)
returns void
language plpgsql
security definer
as $$
begin
    -- Update user's api_credits table with new plan info
    update public.api_credits
    set 
        plan_id = p_plan_id,
        updated_at = now()
    where user_id = p_user_id;

    -- Create an audit log entry
    insert into audit_logs (
        event_type,
        user_id,
        changes
    )
    values (
        'plan_update',
        p_user_id,
        jsonb_build_object(
            'plan_id', p_plan_id,
            'updated_at', now()
        )
    );
end;
$$;

-- Add plan_id to api_credits table if it doesn't exist
do $$ 
begin
    if not exists (select 1 
        from information_schema.columns 
        where table_schema = 'public' 
        and table_name = 'api_credits' 
        and column_name = 'plan_id') 
    then
        alter table public.api_credits 
        add column plan_id uuid references pricing_plans(id);
    end if;
end $$;

-- Update the handle_new_user_credits function to set default plan
create or replace function public.handle_new_user_credits()
returns trigger
language plpgsql
security definer
as $$
declare
    v_pay_as_you_go_id uuid;
begin
    -- Get the Pay As You Go plan ID
    select id into v_pay_as_you_go_id
    from public.pricing_plans
    where name = 'Pay As You Go';

    -- Insert new user credits with default plan
    insert into public.api_credits (
        user_id,
        plan_id,
        total_credits,
        used_credits,
        is_trial
    )
    values (
        new.id,
        v_pay_as_you_go_id,
        1000, -- Free tier starting credits
        0,
        true
    );
    return new;
end;
$$;

-- Add RLS policies
alter table public.pricing_plans enable row level security;
alter table public.pricing_features enable row level security;
alter table public.pricing_tiers enable row level security;

create policy "Pricing plans are viewable by everyone"
    on public.pricing_plans for select
    using (true);

create policy "Pricing features are viewable by everyone"
    on public.pricing_features for select
    using (true);

create policy "Pricing tiers are viewable by everyone"
    on public.pricing_tiers for select
    using (true);
