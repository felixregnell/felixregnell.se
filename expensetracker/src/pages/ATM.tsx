import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Result = {
    name: string | null;
    address: string | null;
};

function ATM() {
    const [input, setText] = useState("");
    const [results, setResults] = useState<Result[]>([]);


    async function doSearch(query: string) {
        //reset
        setResults([]);

        try {
            const resp = await fetch("https://places.googleapis.com/v1/places:searchText", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": "AIzaSyASfZAiCoqoqBW3mjHhiW99d66l6wNqZ2E",
                    "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
                },
                body: JSON.stringify({ textQuery: `ATM in ${query}, Sweden` }),
            });

            //tvingar den till json för att inte hantera typer
            const json = await resp.json();
            console.log("Response json", json);

            const parsed: Result[] = json.places.map((place: any) => ({
                name: place.displayName?.text || null,
                address: place.formattedAddress || null,
            }));
            setResults(parsed);
        } catch (err: any) { console.error(err) };
    }
    return (
        <div >
            <h2>Search for ATM in Sweden</h2>
            <div className="text-muted-foreground leading-none">
                If you find an ATM, you can generate som data to track
                <div />

                <Input
                    value={input}
                    onChange={(e: any) => {
                        setText(e.target.value);
                    }}
                    placeholder="City"
                />
                <Button onClick={() => doSearch(input)}>
                    Search
                </Button>
            </div>
            <ul className="space-y-3 mt-4  bg-neutral-700">
                {results.map((result, index) => (
                    <li key={index} className="p-3 border">
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm">{result.address}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ATM;