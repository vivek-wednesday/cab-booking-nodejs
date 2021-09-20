CREATE TABLE bookings 
(
    booking_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    driver_id INT NOT NULL,
    cab_id INT NOT NULL,
    pickup_location VARCHAR(32) NOT NULL,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    drop_location VARCHAR(32) NOT NULL,
    end_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    cost INT NOT NULL,
    booking_status VARCHAR(32) NOT NULL
);