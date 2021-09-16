create table oauth_clients (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  client_id VARCHAR(320) NOT NULL, 
  client_secret VARCHAR(36) NOT NULL, 
  grant_type ENUM('CLIENT_CREDENTIALS'), 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT oauth_clients_client_id UNIQUE (client_id), 
  INDEX(client_id),
  INDEX(client_secret)
);
