import { ScrollArea } from "@/components/ui/scroll-area";

export const Terms = () => {
  return (
    <section className="relative z-10 py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-green-400 mb-6">Terms and Conditions</h2>
          
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6 text-green-300/90">
              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">1. Service Terms</h3>
                <p className="mb-4">
                  By accessing and using Udene's fraud detection services, you agree to these terms and conditions. Our services are provided "as is" and are subject to change with notice.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">2. Data Processing</h3>
                <p className="mb-4">
                  We process data in accordance with our Privacy Policy and applicable data protection laws. You retain ownership of your data while granting us necessary permissions to provide our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">3. Service Level Agreement</h3>
                <p className="mb-4">
                  We strive to maintain 99.9% uptime for our services. Specific service levels are detailed in your subscription agreement.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">4. API Usage</h3>
                <p className="mb-4">
                  API access is subject to rate limits and fair usage policies. Detailed API documentation is provided upon account activation.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">5. Compliance Requirements</h3>
                <p className="mb-4">
                  Users must comply with applicable laws and regulations. We provide tools to help maintain compliance but ultimate responsibility lies with the user.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">6. Security Obligations</h3>
                <p className="mb-4">
                  Users must maintain secure access credentials and follow security best practices. Any security incidents must be reported immediately.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">7. Billing and Payments</h3>
                <p className="mb-4">
                  Services are billed according to your subscription plan. Payment terms and refund policies are specified in your service agreement.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">8. Termination</h3>
                <p className="mb-4">
                  Either party may terminate service with notice as specified in the service agreement. Data retention and deletion policies apply post-termination.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">9. Liability Limitations</h3>
                <p className="mb-4">
                  Our liability is limited as specified in the service agreement. We provide no warranties beyond those explicitly stated.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-green-400 mb-3">10. Updates to Terms</h3>
                <p className="mb-4">
                  These terms may be updated with notice. Continued use of services constitutes acceptance of updated terms.
                </p>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};