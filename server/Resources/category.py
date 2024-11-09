from flask_restful import Resource, reqparse
from models import Categories, db
from flask import request
from Resources.roles import admin_required

class CategoryResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help='Name of the category is required')
    parser.add_argument('description', type=str, required=True, help='Description of the category is required')
    @admin_required
    def get(self, id=None):
        #if id is not provided, fetch all the categories
        if id is None:
            categories = Categories.query.all()
            return [category.to_dict() for category in categories], 200 #serializing all the categories
        
        # if id is provided, fetch the category with the given id
        category = Categories.query.filter_by(category_id=id).first()
        if category is None:
            return {
                'message': "Category not found"
            }, 404
        return category.to_dict(), 200 #return the serilaized category
    @admin_required
    def post(self):
        data = self.parser.parse_args()
        
        try:
            category = Categories(name=data['name'], description=data['description'])
            db.session.add(category)
            db.session.commit()
            return category.to_dict(), 201 # return the serilaized category with status code 201
        except Exception as e:
            db.session.rollback()
            return{'message': "error creating the category","error": str(e)}, 500
    @admin_required
    def patch(self, id):
        data = self.parser.parse_args()
        category = Categories.query.filter_by(category_id = id).first()
        
        if category is None:
            return {
                'message': "Category not found"
            }, 404
        category.name = data['name']
        category.description = data['description']
        if category.name == data['name'] and category.description == data['description']:
            return {
                "message": "No changes made to the category",
                "category": category.to_dict()
            }, 200
        try:
            db.session.commit()
            return {
                "message": "category updated successfully",
                "category": category.to_dict()
                
            }, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "an erro occurred updating the category","error": str(e)},500
    @admin_required    
    def delete(self, id):
        
        category = Categories.query.filter_by(category_id = id).first()
        
        if category is None:
            return {
                'message': "Category not found"
            },404
        db.session.delete(category)
        db.session.commit()
        return {
            "message": "category deleted successfully",
            "category_id": id
        }, 200
        
            
    
    