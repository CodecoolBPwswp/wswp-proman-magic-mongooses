import bcrypt


def create_password_hash(plain_text_password):
    hashed_password = bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())
    return hashed_password


def verify_password(entered_password, hashed_password):
    is_correct = None
    try:
        is_correct = bcrypt.checkpw(entered_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except ValueError:
        is_correct = False
    return is_correct
