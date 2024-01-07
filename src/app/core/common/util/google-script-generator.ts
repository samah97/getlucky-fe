import {Renderer2} from "@angular/core";

const GOOGLE_URL = 'https://accounts.google.com/gsi/client';

export class GoogleScriptGenerator {



  public static appendScript(renderer:Renderer2, document:Document){
    const script = renderer.createElement('script');
    script.src = GOOGLE_URL;
    script.async = true;
    script.defer = true;
    renderer.appendChild(document.head, script);
  }

}
