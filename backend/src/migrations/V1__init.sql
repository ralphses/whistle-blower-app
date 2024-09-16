CREATE DATABASE IF NOT EXISTS `whistlechain`;

USE `whistlechain`;

-- Create whistleblower table
CREATE TABLE IF NOT EXISTS whistleblower (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create agency table
CREATE TABLE IF NOT EXISTS agency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create report table
CREATE TABLE IF NOT EXISTS report (
    id INT AUTO_INCREMENT PRIMARY KEY,
    whistleblower_id INT,
    report_statement TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    recipient_agency INT NOT NULL,
    file_url VARCHAR(255), -- Stores URL to file, can be NULL
    status VARCHAR(50) DEFAULT 'created', -- Changed to VARCHAR
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (whistleblower_id) REFERENCES whistleblower(id),
    FOREIGN KEY (recipient_agency) REFERENCES agency(id)
);


ALTER TABLE report
MODIFY COLUMN status VARCHAR(255);

