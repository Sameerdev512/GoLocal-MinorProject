package com.GoLocal.backend.utils;

import java.util.Random;

public class OtpGenerator {

    public static  String generateOtp(){
        StringBuilder otp = new StringBuilder();
        Random random = new Random();
        int count = 0;
        while(count < 4 )
        {
            otp.append(random.nextInt(10));
            count++;
        }
        return otp.toString();
    }
//    public static void mail(String[] args)
//    {
//        System.out.println(generateOtp());
//    }
}
