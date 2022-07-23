-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 24 juil. 2022 à 00:02
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `user_name` varchar(50) DEFAULT NULL,
  `user_id` int(9) DEFAULT NULL,
  `post_id` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`user_name`, `user_id`, `post_id`) VALUES
(NULL, NULL, NULL),
('slim', 3, 2),
('seif badreddine', 2, 2),
('seif badreddine', 2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `user_id` int(9) DEFAULT NULL,
  `post_id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `likes` int(10) NOT NULL,
  `shared_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`user_id`, `post_id`, `title`, `body`, `likes`, `shared_at`) VALUES
(2, 2, 'Random Text', 'So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?\r\nSo perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?\r\nSo perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?\r\nSo perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?', 0, '2022-07-20 12:09:17'),
(3, 4, 'test', 'diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia \r\ndiauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia \r\ndiauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia \r\ndiauh aidhfai dia diauh aidhfai dia diauh aidhfai dia diauh aidhfai dia ', 0, '2022-07-20 12:15:42');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(2, 'seif badreddine', 'baddredineseif@gmail.com', '$2b$10$eagM5TnnCHvjMMax8/avHeO6r4wWlBrZz8bTR7KrhSRHemSRahYGq'),
(3, 'slim kasraoui', 'slimkasr@gmail.com', '$2b$10$GR2UPje.ck11fIaCb1OSYevcyasLgxwlyIwfZxgEqQD5A3EiHr6Sa');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
