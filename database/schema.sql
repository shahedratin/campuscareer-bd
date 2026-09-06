
CREATE TABLE admin (
    admin_id      INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)        NOT NULL,
    email         VARCHAR(150)        NOT NULL UNIQUE,
    password_hash VARCHAR(255)        NOT NULL,
    created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student (
    student_id    INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)        NOT NULL,
    email         VARCHAR(150)        NOT NULL UNIQUE,
    password_hash VARCHAR(255)        NOT NULL,
    university    VARCHAR(150),
    department    VARCHAR(100),
    preferred_location VARCHAR(100),
    is_verified   BOOLEAN             DEFAULT FALSE,
    created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_phone (
    phone_id      INT AUTO_INCREMENT PRIMARY KEY,
    student_id    INT                 NOT NULL,
    phone_number  VARCHAR(20)         NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

CREATE TABLE employer (
    employer_id   INT AUTO_INCREMENT PRIMARY KEY,
    company_name  VARCHAR(150)        NOT NULL,
    email         VARCHAR(150)        NOT NULL UNIQUE,
    password_hash VARCHAR(255)        NOT NULL,
    address       VARCHAR(255),
    is_verified   BOOLEAN             DEFAULT FALSE,
    created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skill (
    skill_id      INT AUTO_INCREMENT PRIMARY KEY,
    skill_name    VARCHAR(100)        NOT NULL UNIQUE
);

CREATE TABLE student_skill (
    student_id    INT                 NOT NULL,
    skill_id      INT                 NOT NULL,
    PRIMARY KEY (student_id, skill_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id)   REFERENCES skill(skill_id)     ON DELETE CASCADE
);

CREATE TABLE job (
    job_id        INT AUTO_INCREMENT PRIMARY KEY,
    employer_id   INT                 NOT NULL,
    title         VARCHAR(150)        NOT NULL,
    description   TEXT,
    job_type      ENUM('Internship', 'Part-time') NOT NULL,
    location      VARCHAR(100),
    working_hours VARCHAR(50),
    status        ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id) ON DELETE CASCADE
);

CREATE TABLE job_skill (
    job_id        INT                 NOT NULL,
    skill_id      INT                 NOT NULL,
    PRIMARY KEY (job_id, skill_id),
    FOREIGN KEY (job_id)   REFERENCES job(job_id)     ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE
);

CREATE TABLE application (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id     INT                NOT NULL,
    job_id         INT                NOT NULL,
    status         ENUM('Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected')
                       DEFAULT 'Applied',
    applied_date   TIMESTAMP          DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id)     REFERENCES job(job_id)         ON DELETE CASCADE,
    UNIQUE KEY uq_student_job (student_id, job_id)
);

CREATE TABLE schedule (
    schedule_id   INT AUTO_INCREMENT PRIMARY KEY,
    student_id    INT                 NOT NULL,
    day           ENUM('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL,
    start_time    TIME                NOT NULL,
    end_time      TIME                NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

CREATE TABLE notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id       INT               NOT NULL,
    message          VARCHAR(255)      NOT NULL,
    type             VARCHAR(50),
    sent_date        TIMESTAMP         DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

CREATE TABLE interview (
    interview_id  INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT                NOT NULL,
    interview_date DATE               NOT NULL,
    interview_time TIME               NOT NULL,
    mode           ENUM('Online', 'In-person') DEFAULT 'Online',
    details        VARCHAR(255),
    FOREIGN KEY (application_id) REFERENCES application(application_id) ON DELETE CASCADE
);

-- Sample seed data (optional)
INSERT INTO skill (skill_name) VALUES ('React'), ('JavaScript'), ('CSS'), ('Figma'), ('Writing'), ('Excel');

INSERT INTO employer (company_name, email, password_hash, address, is_verified)
VALUES ('PixelForge Ltd.', 'hr@pixelforge.bd', 'CHANGE_ME_HASH', 'Dhaka', TRUE);

INSERT INTO student (name, email, password_hash, university, department, preferred_location, is_verified)
VALUES ('Nabila Haque', 'nabila@aiub.edu', 'CHANGE_ME_HASH', 'AIUB', 'CSE', 'Dhaka', TRUE);

INSERT INTO job (employer_id, title, description, job_type, location, working_hours, status)
VALUES (1, 'Frontend Developer Intern', 'Work on our student-facing web app.', 'Internship', 'Dhaka', '20 hrs/week', 'Approved');