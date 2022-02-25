-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 25, 2022 at 10:18 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `manto`
--
-- --------------------------------------------------------
--
-- Table structure for table `answers`
--
CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `property` int(11) NOT NULL,
  `match_id` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `categories`
--
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `comments`
--
CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `mode` int(11) NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `content` text NOT NULL,
  `team` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `matches`
--
CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `team` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `properties`
--
CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `type` int(11) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `teams`
--
CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `avatar` varchar(191) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `team_members`
--
CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `permissions` int(11) NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `permissions` int(11) NOT NULL DEFAULT 0,
  `salt` varchar(191) NOT NULL,
  `hashed_password` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `verification_token` varchar(191) DEFAULT NULL,
  `preferred_name` varchar(191) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Indexes for dumped tables
--
--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `salt` (`salt`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `verification_token` (`verification_token`);
--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;