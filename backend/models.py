from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, Float, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import uuid


def generate_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    decisions = relationship("Decision", back_populates="user")


class Decision(Base):
    __tablename__ = "decisions"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    category = Column(String(100))  # career, finance, health, business, education
    context = Column(JSON)  # Additional context data
    status = Column(String(50), default="draft")  # draft, simulating, completed, archived
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="decisions")
    scenarios = relationship("Scenario", back_populates="decision", cascade="all, delete-orphan")


class Scenario(Base):
    __tablename__ = "scenarios"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    decision_id = Column(String, ForeignKey("decisions.id"), nullable=False)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    probability = Column(Float)  # 0.0 to 1.0
    timeline_data = Column(JSON)  # Timeline milestones and events
    outcomes = Column(JSON)  # Financial, satisfaction, risk metrics
    risks = Column(JSON)  # Risk factors
    recommendations = Column(Text)
    rank = Column(Integer)  # Ranking based on optimization
    created_at = Column(DateTime, default=datetime.utcnow)
    
    decision = relationship("Decision", back_populates="scenarios")

