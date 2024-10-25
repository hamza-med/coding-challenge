package com.hamza.codingchallenge.joke;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JokeService {
    private final JokeRepository jokeRepo;

    public JokeService(JokeRepository jokeRepo) {
        this.jokeRepo = jokeRepo;
    }

    public Joke addJoke(Joke joke) {
        return jokeRepo.save(joke);
    }

    public List<Joke> getJokes() {
        return jokeRepo.findAll().stream().toList();
    }

    public List<Joke> getJokesByContent(String keyword) {
        return jokeRepo.findByContentContaining(keyword);
    }

    public Joke rateJoke(Integer jokeId, Integer rating) {
        if (rating < 0 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }
        Joke joke = jokeRepo.findById(jokeId)
                .orElseThrow(() -> new EntityNotFoundException("Joke not found with ID: " + jokeId));

        joke.setRating(rating);
        return jokeRepo.save(joke);
    }

}
