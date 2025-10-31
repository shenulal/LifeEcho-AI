from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
import auth
from database import get_db
import ai_service

router = APIRouter(prefix="/api/v1/decisions", tags=["Decisions"])


@router.post("", response_model=schemas.DecisionResponse, status_code=status.HTTP_201_CREATED)
def create_decision(
    decision: schemas.DecisionCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new decision"""
    
    db_decision = models.Decision(
        user_id=current_user.id,
        title=decision.title,
        description=decision.description,
        category=decision.category,
        context=decision.context or {}
    )
    db.add(db_decision)
    db.commit()
    db.refresh(db_decision)
    
    return db_decision


@router.get("", response_model=List[schemas.DecisionResponse])
def get_decisions(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get all decisions for current user"""
    
    decisions = db.query(models.Decision).filter(
        models.Decision.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return decisions


@router.get("/{decision_id}", response_model=schemas.DecisionWithScenariosResponse)
def get_decision(
    decision_id: str,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific decision with its scenarios"""
    
    decision = db.query(models.Decision).filter(
        models.Decision.id == decision_id,
        models.Decision.user_id == current_user.id
    ).first()
    
    if not decision:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Decision not found"
        )
    
    scenarios = db.query(models.Scenario).filter(
        models.Scenario.decision_id == decision_id
    ).order_by(models.Scenario.rank).all()
    
    return {
        "decision": decision,
        "scenarios": scenarios
    }


@router.put("/{decision_id}", response_model=schemas.DecisionResponse)
def update_decision(
    decision_id: str,
    decision_update: schemas.DecisionUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Update a decision"""
    
    db_decision = db.query(models.Decision).filter(
        models.Decision.id == decision_id,
        models.Decision.user_id == current_user.id
    ).first()
    
    if not db_decision:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Decision not found"
        )
    
    # Update fields
    update_data = decision_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_decision, field, value)
    
    db.commit()
    db.refresh(db_decision)
    
    return db_decision


@router.delete("/{decision_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_decision(
    decision_id: str,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a decision"""
    
    db_decision = db.query(models.Decision).filter(
        models.Decision.id == decision_id,
        models.Decision.user_id == current_user.id
    ).first()
    
    if not db_decision:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Decision not found"
        )
    
    db.delete(db_decision)
    db.commit()
    
    return None


@router.post("/{decision_id}/simulate", response_model=schemas.DecisionWithScenariosResponse)
def simulate_decision(
    decision_id: str,
    simulation_request: schemas.SimulationRequest,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Generate AI-powered scenarios for a decision"""
    
    decision = db.query(models.Decision).filter(
        models.Decision.id == decision_id,
        models.Decision.user_id == current_user.id
    ).first()
    
    if not decision:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Decision not found"
        )
    
    # Update decision status
    decision.status = "simulating"
    db.commit()
    
    try:
        # Generate scenarios using AI
        scenarios_data = ai_service.generate_scenarios(
            decision_title=decision.title,
            decision_description=decision.description or "",
            category=decision.category,
            context=decision.context or {},
            num_scenarios=simulation_request.num_scenarios,
            time_horizon_years=simulation_request.time_horizon_years
        )
        
        # Delete existing scenarios
        db.query(models.Scenario).filter(
            models.Scenario.decision_id == decision_id
        ).delete()
        
        # Create new scenarios
        db_scenarios = []
        for scenario_data in scenarios_data:
            db_scenario = models.Scenario(
                decision_id=decision_id,
                title=scenario_data.get("title", "Untitled Scenario"),
                description=scenario_data.get("description", ""),
                probability=scenario_data.get("probability", 0.5),
                timeline_data=scenario_data.get("timeline", []),
                outcomes=scenario_data.get("outcomes", {}),
                risks=scenario_data.get("risks", []),
                recommendations=scenario_data.get("recommendations", ""),
                rank=scenario_data.get("rank", 1)
            )
            db.add(db_scenario)
            db_scenarios.append(db_scenario)
        
        # Update decision status
        decision.status = "completed"
        db.commit()
        
        # Refresh scenarios
        for scenario in db_scenarios:
            db.refresh(scenario)
        
        return {
            "decision": decision,
            "scenarios": db_scenarios
        }
    
    except Exception as e:
        decision.status = "draft"
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating scenarios: {str(e)}"
        )

