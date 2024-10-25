package com.hamza.codingchallenge.joke;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin
@RequestMapping("/jokes")
public class JokeController {
    private final JokeService jokeService;

    public JokeController(JokeService jokeService) {
        this.jokeService = jokeService;
    }

    /**
     * Create a new joke
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Joke addJoke(@Valid @RequestBody Joke joke) {
        return this.jokeService.addJoke(joke);
    }

    /**
     * Rate a joke
     */
    @PutMapping("/{jokeId}/rate")
    public ResponseEntity<Joke> rateJoke(
            @PathVariable Integer jokeId,
            @RequestParam Integer rating) {

        Joke updatedJoke = jokeService.rateJoke(jokeId, rating);
        return ResponseEntity.ok(updatedJoke);
    }

    /**
     * Get all jokes
     */
    @GetMapping
    public List<Joke> getJokes() {
        return this.jokeService.getJokes();
    }

    /**
     * Get jokes containing specific keywords.
     */
    @GetMapping("/search")
    public List<Joke> searchJokes(@RequestParam String keyword) {
        return jokeService.getJokesByContent(keyword);
    }

    /**
     * Get random joke from database
     */
    @GetMapping("/random")
    public Joke getRandomJoke() {
        List<Joke> jokes = jokeService.getJokes();
        return jokes.isEmpty() ? null : jokes.get(new Random().nextInt(jokes.size()));
    }

    /**
     * Custom exception handler : catch validation errors and return the error for every field
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exp
    ) {
        var errors = new HashMap<String, String>();
        exp.getBindingResult().getAllErrors().forEach(error -> {
            var fieldName = ((FieldError) error).getField();
            var errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
