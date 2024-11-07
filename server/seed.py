from datetime import datetime
from app import app
from models import db, Users, Organizations, Donation_request, Categories, Donations, Reports


with app.app_context():
    print("start seeding...")
    
    #delete the initial data from the database
    try:
        db.session.query(Users).delete()
        db.session.query(Organizations).delete()
        db.session.query(Donation_request).delete()
        db.session.query(Categories).delete()
        db.session.query(Donations).delete()
        db.session.query(Reports).delete()
        print("Initial data deleted successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting initial data: {e}")
        
    #seed users
    print("Seeding users...")
    users = [
        Users(first_name="John", last_name="Doe", email="john@example.com", phone=1234567890, password="password", role="admin"),
        Users(first_name="Jane", last_name="Smith", email="jane@example.com", phone=9876543210, password="password", role="user")
        
    ]
    try:
        db.session.add_all(users)
        db.session.commit()
        print("Users seeded successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding users: {e}")
        
    #Re-query the users after commit
    user1 = Users.query.filter_by(first_name = 'Jane').first()
    
    
    print("start seeding categories...")
    categories = [
        Categories(name="Flood Victims", description="Helping victims of floods by providing relief supplies and rebuilding efforts."),
        Categories(name="Hunger", description="Providing food for those who are hungry, malnourished, or facing food insecurity."),
        Categories(name="Hospital Bills", description="Helping people pay medical bills and cover healthcare costs."),
        Categories(name="School Fees", description="Donating to cover school fees and educational expenses for underprivileged students."),
        Categories(name="Medical Treatment", description="Donating for medical treatment, including surgeries and health interventions."),
        Categories(name="Shelter", description="Providing temporary housing or constructing homes for homeless individuals and families."),
    ]
    try: 
        db.session.add_all(categories)
        db.session.commit()
        print("Categories seeded successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding categories: {e}")
    
    #seed organizations
    print("start seed organizations...")
    organizations = [
        Organizations(name = "Red Cross", description = "Non-profit organization that aims to improve the lives of the less fortunate", address = "Nairobi, Kenya"),
        Organizations(name = "Humanitarian Society of Africa", description = "International humanitarian organization that works to protect and restore lives in Africa", address = "Cape Town, South Africa")
        
    ]
    try:
        db.session.add_all(organizations)
        db.session.commit()
        print("Organizations seeded successfully.")
        
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding organizations: {e}")
        
    # print("start seed for donation request...")
    # donation_request = [
        
        
    # ]
    