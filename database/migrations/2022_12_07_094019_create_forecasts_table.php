<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForecastsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forecasts', function (Blueprint $table) {
            $table->id();
            $table->integer('timestamp_dt');
            $table->string('city_name');
            $table->decimal('min_tmp');
            $table->decimal('max_tmp');
            $table->decimal('wind_spd');
            $table->timestamps();

            $table->index('city_name');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forecasts');
    }
}
