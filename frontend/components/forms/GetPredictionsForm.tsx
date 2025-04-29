"use client";

import { useState, useEffect, useMemo } from "react";
import { usePredictAttributes } from "@/hooks";
import { Form } from "@/components/forms";
import { LoadingProgress } from "@/components/common";
import { SliderBar } from "@/components/common";
import { GetRecommendationsTable } from "@/components/table";

export default function GetPredictionsForm() {
  const { prompt, response, isLoading, onChange, onSubmit } =
    usePredictAttributes();

  const [sliderData, setSliderData] = useState({
    danceability: 0,
    energy: 0,
    loudness: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    tempo: 0,
    key: 0,
    mode: 0,
    time_signature: 4,
  });

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendBtnClicked, setRecommendBtnClicked] = useState(false);

  // Update formData when response changes
  useEffect(() => {
    if (response?.data) {
      const newData = {
        danceability: response.data.danceability ?? 0,
        energy: response.data.energy ?? 0,
        loudness: response.data.loudness ?? 0,
        speechiness: response.data.speechiness ?? 0,
        acousticness: response.data.acousticness ?? 0,
        instrumentalness: response.data.instrumentalness ?? 0,
        liveness: response.data.liveness ?? 0,
        valence: response.data.valence ?? 0,
        tempo: response.data.tempo ?? 0,
        key: response.data.key ?? 0,
        mode: response.data.mode ?? 0,
        time_signature: response.data.time_signature ?? 4,
      };
      console.log("Updating sliderData:", newData);
      setSliderData(newData);
    }
  }, [response]);

  const prompt_config = [
    {
      labelText: "Prompt",
      labelId: "prompt",
      type: "text",
      value: prompt,
      required: true,
    },
  ];

  const slider_config = useMemo(
    () => [
      {
        label: "Danceability",
        value: sliderData.danceability,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "danceability",
      },
      {
        label: "Energy",
        value: sliderData.energy,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "energy",
      },
      {
        label: "Loudness",
        value: sliderData.loudness,
        max_value: 5,
        min_value: -50,
        step: 0.1,
        name: "loudness",
      },
      {
        label: "Speechiness",
        value: sliderData.speechiness,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "speechiness",
      },
      {
        label: "Acousticness",
        value: sliderData.acousticness,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "acousticness",
      },

      {
        label: "Instrumentalness",
        value: sliderData.instrumentalness,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "instrumentalness",
      },
      {
        label: "Liveness",
        value: sliderData.liveness,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "liveness",
      },
      {
        label: "Valence",
        value: sliderData.valence,
        max_value: 1,
        min_value: 0,
        step: 0.1,
        name: "valence",
      },
      {
        label: "Tempo",
        value: sliderData.tempo,
        max_value: 300,
        min_value: 0,
        step: 1,
        name: "tempo",
      },
    ],
    [sliderData]
  );

  const tooltipDescriptions: { [key: string]: string } = {
    danceability:
      "Measures how suitable a track is for dancing. Tracks with high danceability scores are more energetic and rhythmic, making them ideal for dancing",
    energy:
      "Represents intensity and activity within a song. Tracks with high energy tend to be more fast-paced and intense",
    loudness:
      "Indicates how loud or quiet an entire song is in decibels (dB). Positive values represent louder songs while negative values suggest quieter ones",
    speechiness:
      "Represents the presence of spoken words in a track. Songs with more spoken words (e.g. rap) have high speechiness values",
    acousticness:
      "Represents the extent to which a track possesses an acoustic quality. Tracks with high acousticness values sound more acoustic (e.g., natural, non-electronic), while tracks with low acousticness values sound more electronic (e.g., synthetic, artificial)",
    instrumentalness:
      "The likelihood a track contains no vocals, higher values indicate more instrumental content.",
    liveness:
      "The presence of a live audience in the recording, higher values indicate a live performance.",
    valence:
      "Represents the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g., happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g., sad, depressed, angry)",
    tempo:
      "The speed or pace of a track in beats per minute (BPM), typically between 0 and 300.",
  };

  const handleSliderChange = (name: string, value: number) => {
    setSliderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
    setRecommendBtnClicked(true);
  };

  return (
    <div className="space-y-6">
      <Form
        config={prompt_config}
        isLoading={isLoading}
        btnText="Get Predictions"
        onSubmit={(e) => {
          setRecommendBtnClicked(false);
          onSubmit(e);
        }}
        onChange={onChange}
      />

      {isLoading && <LoadingProgress />}

      {!isLoading && !recommendBtnClicked && response && (
        <div className="mt-6 p-6 bg-white rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Predicted Attributes
          </h3>

          <div>
            <SliderBar
              config={slider_config}
              tooltipDescriptions={tooltipDescriptions}
              onValueChange={handleSliderChange}
            />
          </div>

          <button
            type="button"
            className="mt-12 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleGetRecommendations}
          >
            Get Recommendations
          </button>
        </div>
      )}

      {recommendBtnClicked && response && (
        <div className="mt-6 p-6 bg-white rounded-lg">
          {showRecommendations && (
            <GetRecommendationsTable
              adjusted_attributes={sliderData}
              sessionId={response.session_id}
            />
          )}
        </div>
      )}
    </div>
  );
}
