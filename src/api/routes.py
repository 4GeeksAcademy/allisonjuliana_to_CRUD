from flask import request, jsonify, Blueprint
from api.models import db, User

api = Blueprint('api', __name__)

@api.route("/hello", methods=["GET"])
def get_hello():
    dictionary = {
        "message": "Hello, world!"
    }
    return jsonify(dictionary)


@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    if not users:
        return jsonify(message="No users found"), 404
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(message="Users", users=all_users), 200


@api.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):

    user = User.query.get(id)

    if not user:
        return jsonify(message="User not found"), 404
    
    return jsonify(message="User", user=user.serialize()), 200


@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify(message="User not found"), 404

    data = request.get_json()

    if 'actor' in data:
        user.actor = data['actor']
    if 'country' in data:
        user.country = data['country']
    if 'age' in data:
        user.age = data['age']

    db.session.commit()

    return jsonify(message="User updated successfully", user=user.serialize()), 200


@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify(message="User not found"), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify(message="User deleted successfully"), 200
