<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raw_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->string('origin');
            $table->json('data');
            $table->foreignId('processed_event_id')->nullable()->constrained();
            $table->foreignId('site_id')->nullable()->constrained();
            $table->text('user_agent')->nullable();
            $table->string('status_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('raw_events');
    }
};
