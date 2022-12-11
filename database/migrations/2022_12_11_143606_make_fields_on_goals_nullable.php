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
        Schema::table('goals', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
            $table->string('positive_related_events')->nullable()->change();
            $table->string('negative_related_events')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('goals', function (Blueprint $table) {
            $table->text('description')->nullable(false)->change();
            $table->string('positive_related_events')->nullable(false)->change();
            $table->string('negative_related_events')->nullable(false)->change();
        });
    }
};
