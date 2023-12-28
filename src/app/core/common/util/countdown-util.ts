export class CountdownUtil {

    public static formatCountdown(text: string): string {
        const parts = text.split(':');
        if (parts.length === 4) {
          let i=0;
          let days = parts[i++] ;
          const hours = parts[i++];
          const minutes = parts[i++];
          const seconds = parts[i++];
          if(parseInt(days) == 1 ){
            days = "00";
          }
          return `${days} D : ${hours} H : ${minutes} M : ${seconds} S`;
        }
        return text;
    }

}
