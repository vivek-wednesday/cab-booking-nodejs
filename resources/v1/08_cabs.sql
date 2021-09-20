CREATE TABLE cabs 
(
    cab_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    cab_model VARCHAR(32) NOT NULL,
    cab_license VARCHAR(32) NOT NULL UNIQUE KEY,
    cab_type VARCHAR(32) NOT NULL
);