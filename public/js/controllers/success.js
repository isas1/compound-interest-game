myApp.controller('SuccessController', ['$scope', '$rootScope', 'Authentication',  function($scope, $rootScope, Authentication) {
    
    $scope.imagePath = '../../assets/images/trend_up.png';
    /* Variable declarations */
    
    /* Free calc */
  
    $scope.fixed_income = 21772;
    $scope.fixed_pc = 10;
    /*Post login calc*/
    $scope.current_income = 21772;
    //default years of saving.
    $scope.current_years = 30;
    //default % of income saved.
    $scope.current_pc = 15;
    //$scope.custom_oneLumpSum = 0;
    //$scope.custom_tenLumpSum = 0;
  
    /* Invest calc */
    
    /* Dictionary with risk levels for nutmeg */
    $scope.risk = 5;
    $scope.nutRiskPC = {
      1 : 1.4,
      2 : 3.1,
      3 : 4,
      4 : 5.2,
      5 : 6,
      6 : 6.8,
      7 : 8.2,
      8 : 9.2,
      9 : 10.3,
      10 : 11,
    };
  
    /* Dictionary with risk levels for moneyfarm */
    $scope.riskM = 3;
    $scope.monRiskPC = {
      1 : 5.9,
      2 : 9.9,
      3 : 19.2,
      4 : 21.7,
      5 : 23.7,
      6 : 25.1,
    };
  
    /* Dictionary with risk levels for moneyfarm */
  
    $scope.calc = function() {
      
      $scope.riskPC = $scope.nutRiskPC[$scope.risk.toString()];
      
      $scope.riskPCm =  $scope.monRiskPC[$scope.riskM.toString()];
      
      /*Calculations*/
      
      var lumpTotal = 0;
      
      /* Nutmeg */
      for (var yr = 1; yr <= $scope.current_years; yr++) {
          lumpTotal += $scope.current_income * ($scope.current_pc/100);
          lumpTotal *= $scope.riskPC/100 + 1;
          if(yr == $scope.current_years) {
              $scope.oneLumpSum = lumpTotal;
          }
      } // Nutmeg
    
      var lumpTotal = 0;
      
      /* Moneyfarm */
      for (var yr = 1; yr <= $scope.current_years; yr++) {
          lumpTotal += $scope.current_income * ($scope.current_pc/100);
          lumpTotal *= $scope.riskPCm/100 + 1;
          if(yr == $scope.current_years) {
              $scope.tenLumpSum = lumpTotal;
          }
      } // Moneyfarm
      
      var lumpTotal = 0;
        
      /* Free calc calculations */
      
      /* 1% */
      for (var yr = 1; yr <= $scope.current_years; yr++) {
          lumpTotal += $scope.fixed_income * ($scope.fixed_pc/100);
          lumpTotal *= 1.01;
          if(yr == $scope.current_years) {
              $scope.fixed_oneLumpSum = lumpTotal;
          }
      } // 1%
    
      var lumpTotal = 0;
      
      /* 7% */
      for (var yr = 1; yr <= $scope.current_years; yr++) {
          lumpTotal += $scope.fixed_income * ($scope.fixed_pc/100);
          //alert(lumpTotal);
          lumpTotal *= 1.07;
          if(yr == $scope.current_years) {
              $scope.fixed_sevenLumpSum = lumpTotal;
          }
      } // 7%
      
      var lumpTotal = 0;
        
      /* Custom calc calculations */
      
      /* 1% */
      for (var yr = 1; yr <= $scope.current_years; yr++) {
          lumpTotal += $scope.current_income * ($scope.current_pc/100);
          lumpTotal *= 1.01;
          if(yr == $scope.current_years) {
              $scope.custom_oneLumpSum = lumpTotal;
          }
      } // 1%
      
      var lumpTotal = 0;
      
      /* 10% */
      for (var yr = 1; yr <= $scope.current_years; yr++) {
          lumpTotal += $scope.current_income * ($scope.current_pc/100);
          lumpTotal *= 1.1;
          if(yr == $scope.current_years) {
              $scope.custom_tenLumpSum = lumpTotal;
          }
      } // 7%
      
      var lumpTotal = 0;
      
      /* Card colour changes */
      
      function card_colour(lump, card) {
        if (parseInt(lump) < 100000) {
          $(card).css('background-color', '#EDE7F6');
          $(card).css('color', '#000');
        } else if (parseInt(lump) < 1000000) {
          $(card).css('background-color', '#D1C4E9');
          $(card).css('color', '#000');
        } else {
          $(card).css('background-color', '#673AB7');
          $(card).css('color', '#fff');
        }
      }
      
      card_colour($scope.oneLumpSum, '#company_1_card');
      card_colour($scope.tenLumpSum, '#company_2_card');
      card_colour($scope.fixed_oneLumpSum, '#landing_card1');
      card_colour($scope.fixed_sevenLumpSum, '#landing_card2');
      card_colour($scope.custom_oneLumpSum, '#success_card1');
      card_colour($scope.custom_tenLumpSum, '#success_card2');
      
    }; // calc()    
    $scope.calc();
}]); // controller