<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    use HasFactory;

    protected $fillable = [
        'timestamp_dt',
        'city_name',
        'min_tmp',
        'max_tmp',
        'wind_spd',
    ];

    /**
     * @param $data
     * @return mixed
     */
    public static function updateOrCreateForecast($data)
    {
        return self::updateOrCreate([
            'city_name' => $data['city_name'],
        ],
            [
                'timestamp_dt' => $data['list']['dt'],
                'city_name' => $data['city_name'],
                'min_tmp' => $data['list']['main']['temp_min'],
                'max_tmp' => $data['list']['main']['temp_max'],
                'wind_spd' => $data['list']['wind']['speed'],
            ]);
    }

    /**
     * @param $city
     * @return mixed
     */
    public static function fetchForecastByCity($city)
    {
        return self::where('city_name', $city)->first();
    }
}
