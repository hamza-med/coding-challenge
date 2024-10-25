package com.hamza.codingchallenge.joke;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface JokeRepository extends JpaRepository<Joke, Integer> {
    List<Joke> findByContentContaining(String keyword);
}
