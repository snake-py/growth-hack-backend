<?php

namespace Database\Seeders;

use App\Jobs\ProcessEvent;
use App\Models\Goal;
use App\Models\Site;
use Database\Factories\RawEventFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedEvents extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $site = Site::first();

        if (!$site) {
            $this->command->error('No site found. Please run the DatabaseSeeder first.');
            return;
        }

        for ($i = 0; $i < 100; $i++) {
            $rawEvent = RawEventFactory::new()->create([
                'event_name' => 'visit_site',
                'data' => json_encode([]),
                'origin' => $site->url,
                'user_agent' => $this->getRandomUserAgent(),
            ]);
            ProcessEvent::dispatch($rawEvent);
        }

        for ($i = 0; $i < 10; $i++) {
            $rawEvent = RawEventFactory::new()->create([
                'event_name' => 'got_in_contact_via_email',
                'data' => json_encode($this->getData()),
                'origin' => $site->url,
                'user_agent' => $this->getRandomUserAgent(),
            ]);
            ProcessEvent::dispatch($rawEvent);
        }

        for ($i = 0; $i < 20; $i++) {
            $rawEvent = RawEventFactory::new()->create([
                'event_name' => 'watched_contact_video',
                'data' => json_encode($this->getPositiveRelatedEventData()),
                'origin' => $site->url,
                'user_agent' => $this->getRandomUserAgent(),
            ]);
            ProcessEvent::dispatch($rawEvent);
        }

        for ($i = 0; $i < 80; $i++) {
            $rawEvent = RawEventFactory::new()->create([
                'event_name' => 'skipped_contact_video',
                'data' => json_encode($this->getNegativeEventData()),
                'origin' => $site->url,
                'user_agent' => $this->getRandomUserAgent(),
            ]);
            ProcessEvent::dispatch($rawEvent);
        }


        Goal::create([
            'title' => 'increase-email-contact',
            'site_id' => $site->id,
            'main_event' => 'got_in_contact_via_email',
            'positive_related_events' => '["watched_contact_video"]',
            'negative_related_events' => '["skipped_contact_video"]',
            'description' => 'Increase the number of people who got in contact via email',
        ]);
    }

    private function getPositiveRelatedEventData()
    {
        $number = $this->randomInteger();
        return [
            'watched_time' => $number / 9.1,
        ];
    }

    private function getNegativeEventData()
    {
        $number = $this->randomInteger();
        return [
            'left_before_video_was_loaded' => $number > 50,
        ];
    }

    private function getRandomUserAgent()
    {
        $number = $this->randomInteger();
        return $number > 50
            ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';
    }

    private function getData()
    {
        $number = $this->randomInteger();
        return [
            'took_action' => $number > 50 ? 'yes' : 'no',
            'time_required_to_hit_cta' => $number > 50 ? $this->randomInteger() : null
        ];
    }

    private function randomInteger(): int
    {
        return rand(1, 100);
    }
}
