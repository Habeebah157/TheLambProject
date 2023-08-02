CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    latitude NUMERIC,
    longitude NUMERIC,
    address VARCHAR(200)
);

INSERT INTO cities (name, latitude, longitude, address)
VALUES
    ('New York', 40.7128, -74.0060, '123 Broadway, New York, NY'),
    ('San Francisco', 37.7749, -122.4194, '456 Market St, San Francisco, CA'),
    ('Boston', 42.3601, -71.0589, '789 Park Ave, Boston, MA'),
    ('Seattle', 47.6062, -122.3321, '101 Main St, Seattle, WA'),
    ('Chicago', 41.8781, -87.6298, '555 State St, Chicago, IL'),
    ('Austin', 30.2672, -97.7431, '777 Congress Ave, Austin, TX'),
    ('Raleigh', 35.7796, -78.6382, '888 Capital Blvd, Raleigh, NC'),
    ('Denver', 39.7392, -104.9903, '999 Colorado Ave, Denver, CO'),
    ('Washington D.C.', 38.9072, -77.0369, '101 Constitution Ave NW, Washington, D.C.'),
    ('San Diego', 32.7157, -117.1611, '555 Harbor Dr, San Diego, CA'),
    ('Los Angeles', 34.0522, -118.2437, '789 Hollywood Blvd, Los Angeles, CA'),
    ('Dallas', 32.7767, -96.7970, '222 Commerce St, Dallas, TX'),
    ('Atlanta', 33.7490, -84.3880, '333 Peachtree St NE, Atlanta, GA'),
    ('Houston', 29.7604, -95.3698, '444 Texas Ave, Houston, TX'),
    ('Phoenix', 33.4484, -112.0740, '123 Phoenix Ave, Phoenix, AZ'),
    ('Portland', 45.5051, -122.6750, '222 Burnside St, Portland, OR'),
    ('Minneapolis', 44.9778, -93.2650, '777 Nicollet Mall, Minneapolis, MN'),
    ('Charlotte', 35.2271, -80.8431, '555 Tryon St, Charlotte, NC'),
    ('Nashville', 36.1627, -86.7816, '444 Broadway, Nashville, TN'),
    ('Philadelphia', 39.9526, -75.1652, '101 Market St, Philadelphia, PA'),
    ('Salt Lake City', 40.7608, -111.8910, '888 State St, Salt Lake City, UT'),
    ('Pittsburgh', 40.4406, -79.9959, '777 Grant St, Pittsburgh, PA'),
    ('Indianapolis', 39.7684, -86.1581, '333 Washington St, Indianapolis, IN'),
    ('Orlando', 28.5383, -81.3792, '123 Orange Ave, Orlando, FL'),
    ('Columbus', 39.9612, -82.9988, '444 High St, Columbus, OH'),
    ('Rochester', 43.1566, -77.6088, '101 Main St, Rochester, NY'),
    ('Providence', 41.8240, -71.4128, '777 Waterman St, Providence, RI'),
    ('Boise', 43.6150, -116.2023, '555 Grove St, Boise, ID'),
    ('Madison', 43.0731, -89.4012, '888 State St, Madison, WI'),
    ('Albuquerque', 35.0845, -106.6511, '123 Central Ave, Albuquerque, NM'),
    ('Charleston', 32.7765, -79.9311, '444 King St, Charleston, SC'),
    ('Des Moines', 41.5868, -93.6250, '555 Walnut St, Des Moines, IA'),
    ('Birmingham', 33.5186, -86.8104, '101 1st Ave, Birmingham, AL'),
    ('Honolulu', 21.3069, -157.8583, '123 Waikiki Beach, Honolulu, HI'),
    ('Savannah', 32.0809, -81.0912, '444 River St, Savannah, GA'),
    ('Tucson', 32.2226, -110.9747, '777 Congress St, Tucson, AZ'),
    ('Omaha', 41.2565, -95.9345, '123 Dodge St, Omaha, NE'),
    ('Little Rock', 34.7465, -92.2896, '555 Main St, Little Rock, AR'),
    ('Jacksonville', 30.3322, -81.6557, '101 Bay St, Jacksonville, FL'),
    ('Baton Rouge', 30.4515, -91.1871, '444 River Rd, Baton Rouge, LA'),
    ('Wichita', 37.6872, -97.3301, '777 Douglas Ave, Wichita, KS'),
    ('Spokane', 47.6588, -117.4260, '123 Main St, Spokane, WA'),
    ('Tallahassee', 30.4383, -84.2807, '555 Capital Cir SE, Tallahassee, FL'),
    ('Lubbock', 33.5779, -101.8552, '888 University Ave, Lubbock, TX'),
    ('Fargo', 46.8772, -96.7898, '101 Main Ave, Fargo, ND'),
    ('Baltimore', 39.2904, -76.6122, '123 Pratt St, Baltimore, MD'),
    ('Cleveland', 41.4993, -81.6944, '555 Euclid Ave, Cleveland, OH'),
    ('Detroit', 42.3314, -83.0458, '777 Woodward Ave, Detroit, MI'),
    ('St. Louis', 38.6273, -90.1978, '444 Market St, St. Louis, MO'),
    ('Milwaukee', 43.0389, -87.9065, '101 Wisconsin Ave, Milwaukee, WI');
