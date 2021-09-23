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
    booking_status VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX(booking_id),
    INDEX(user_id),
    INDEX(driver_id),
    FOREIGN KEY (driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY (cab_id) REFERENCES cabs(cab_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);