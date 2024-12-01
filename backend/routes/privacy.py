from flask import Blueprint, jsonify, request
from ..auth.dependencies import verify_api_key
from ..models.privacy import PrivacyRequest, RetentionPolicy
from ..services.privacy import privacy_handler

bp = Blueprint('privacy', __name__, url_prefix='/api/v1/privacy')

@bp.route("/data-request", methods=["POST"])
def handle_privacy_request():
    verify_api_key()
    data = request.get_json()
    return jsonify(privacy_handler.process_privacy_request(
        data["requestType"],
        data["userId"],
        data["region"]
    ))

@bp.route("/retention-policy", methods=["PUT"])
def update_retention_policy():
    verify_api_key()
    policy = request.get_json()
    return jsonify(privacy_handler.update_retention_policy(policy))