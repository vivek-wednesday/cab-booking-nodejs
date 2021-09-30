CREATE TABLE drivers 
(
    driver_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cab_id INT NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    current_location VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX(driver_id),
    FOREIGN KEY (cab_id) REFERENCES cabs(cab_id)
);