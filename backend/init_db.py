"""
Database initialization script
Run this to create all database tables
"""
from database import engine, Base
from models import User, Decision, Scenario
import sys

def init_database():
    """Create all database tables"""
    try:
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        print("\nTables created:")
        print("  - users")
        print("  - decisions")
        print("  - scenarios")
        return True
    except Exception as e:
        print(f"❌ Error creating database tables: {e}")
        return False

if __name__ == "__main__":
    success = init_database()
    sys.exit(0 if success else 1)

