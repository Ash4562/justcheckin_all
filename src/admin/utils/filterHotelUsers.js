export const extractHotelUsers = (data, hotelId, searchTerm = '') => {
    const term = searchTerm.toLowerCase();
  
    const filterCategory = (list = []) =>
      list
        .filter(u => u.hotel_id === hotelId || u.hotel_id?._id === hotelId)
        .flatMap(item => item.customers || [])
        .filter(user =>
          (user.customer_name && user.customer_name.toLowerCase().includes(term)) ||
          (user.aadhar_number && user.aadhar_number.toLowerCase().includes(term)) ||
          (user.address && user.address.toLowerCase().includes(term))
        );
  
    return {
      aadhaarUsers: filterCategory(data?.BookingData),
      passportUsers: filterCategory(data?.passportData),
      drivingUsers: filterCategory(data?.drivingLicenseData),
      voterUsers: filterCategory(data?.voterData),
    };
  };
  