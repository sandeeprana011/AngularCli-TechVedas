import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'urlersafer'
})
export class UrlersaferPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url: any): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
