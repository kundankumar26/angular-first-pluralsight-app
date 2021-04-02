import { Pipe } from "@angular/core";

@Pipe ({
    name: 'ConvertToSpaces'
})

export class ConvertToSpaces {
    transform(value: string, character: string): string {
        return value.replace(character, ' ');
    }
}