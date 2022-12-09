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
        Schema::create('event_mappers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('host_id');
            $table->string('event_name');
            $table->string('table_name');
            $table->json('map');
            $table->foreign('host_id')->references('id')->on('hosts');
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
        Schema::dropIfExists('event_mappers');
    }
};
