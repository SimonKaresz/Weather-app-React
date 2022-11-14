export interface Data{
    main:Main,
    wind:Wind,
    name:string,
    sys:Sys,
    weather:Weather,
}

export interface Main{
    temp:number,
    humidity:number,
    temp_min:number,
    temp_max:number,
}

export interface Wind{
    speed:number,
}

export interface Sys{
    country:string,
}

export interface Weather{
    main:string,
    deescription:string,
}