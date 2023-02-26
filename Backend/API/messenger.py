import pickle


def write_msg(message, where, progress=0):
    with open(f"status_{where}.txt", "wb") as f:
        pickle.dump({"message": message, "value": progress}, f)


def read_msg(where):
    with open(f"status_{where}.txt", "rb") as f:
        return pickle.load(f)
