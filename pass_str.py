import re

def assess_password_strength(password):
    score = 0
    criteria = {
        "Length >= 8": len(password) >= 8,
        "Contain lowercase": bool(re.search(r'[a-z]', password)),
        "Contain uppercase": bool(re.search(r'[A-Z]', password)),
        "Contains digit": bool(re.search(r'\d', password)),
        "Contain Special character": bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password)),
    }
    score = sum(criteria.values())
    if score <= 2:
        strength = "Weak"
    elif score in (3, 4):
        strength = "Moderate"
    else:
        strength = "Strong"
    return strength, criteria
