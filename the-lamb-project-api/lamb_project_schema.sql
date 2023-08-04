CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email)>1),
    password TEXT NOT NULL, 
    created_at  TIMESTAMP DEFAULT NOW()
);
CREATE TABLE users_preference(
    id SERIAL PRIMARY KEY, 
    City TEXT NOT NULL UNIQUE,
    State TEXT NOT NULL,
    Physician BOOLEAN NOT NULL, 
    Software BOOLEAN NOT NULL, 
    Teachers BOOLEAN NOT NULL,
    Fashion BOOLEAN NOT NULL,
    Culinary BOOLEAN NOT NULL, 
    Social_Work BOOLEAN NOT NULL,
    Hobby TEXT NOT NULL,
    Images TEXT NOT NULL
);
CREATE TABLE user_preference(

    user_email TEXT NOT NULL, 
    State TEXT NOT NULL, 
    Industry TEXT NOT NULL, 
    Hobby TEXT NOT NULL, 
    Weather TEXT NOT NULL,
    states text ARRAY, 
    FOREIGN KEY (user_email) REFERENCES users(email)
    

);


-- craete a back button that goes to city card, when the user goes back to the 
-- to the card place, I check if the user's email is already in the user preference table
-- if it is, then I go get the data in the database based on the email and then I filter the 
--data based on that and put it in the cards. 
-- Also, I want to store the information in the house

-- CREATE TABLE city_scores (
--   id SERIAL PRIMARY KEY,
--   city_name TEXT NOT NULL,
--   scores JSONB NOT NULL,
--   summary TEXT NOT NULL,
--   -- Add other columns for each info stuff 
--   created_at TIMESTAMP DEFAULT NOW()
-- );
