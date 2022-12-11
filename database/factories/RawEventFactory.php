<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RawEvent>
 */
class RawEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'event_name' => $this->faker->word,
            'data' => json_encode([
                'foo' => $this->faker->word,
                'bar' => $this->faker->word,
            ]),
            'origin' => $this->faker->word,
            'user_agent' => $this->faker->word,
        ];
    }
}
