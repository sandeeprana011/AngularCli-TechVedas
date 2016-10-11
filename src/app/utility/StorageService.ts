/**
 * Created by sandeeprana on 03/10/16.
 */
export class StorageService {
    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    writeString(key: string, value: string) {
        // if (value) {
        //     value = JSON.stringify(value);
        // }
        localStorage.setItem(key, value);
    }

    read<T>(key: string): T {
        let value: string = localStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }

        return null;
    }

    readString<T>(key: string): string {
        let value: string = localStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return value;
        }

        return null;
    }
}
