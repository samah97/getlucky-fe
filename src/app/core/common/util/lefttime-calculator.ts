export class LefttimeCalculator {

    public static calculate(lefttime:string){
        const targetDate = new Date(lefttime).getTime();
        const currentDate = new Date().getTime();
        // Calculate the difference in seconds
        return Math.floor((targetDate - currentDate) / 1000);
    }

}
