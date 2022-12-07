<?php

namespace App\Http\Controllers;

use App\Models\Forecast;
use Illuminate\Http\Request;

class ForecastController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        return view('app');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveForecast(Request $request)
    {
        try {
            Forecast::updateOrCreateForecast($request->all());
            $response = [
                'status' => 1,
                'message' => 'Forecast saved successful!'
            ];
        } catch (\Exception $e) {
            $response = [
                'status' => 0,
                'message' => 'Error save Forecast!'
            ];
        }

        return response()->json($response);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getForecast(Request $request)
    {
        $forecast = Forecast::fetchForecastByCity($request->city);
        return response()->json($forecast);
    }
}
