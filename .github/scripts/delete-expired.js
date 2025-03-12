const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function deleteExpiredReservations() {
  try {
    // RPC 함수 호출
    const { data, error } = await supabase.rpc('delete_expired_reservations');
    
    if (error) {
      console.error('만료된 예약 삭제 오류:', error);
      process.exit(1);
    }
    
    console.log('만료된 예약 삭제 완료:', data);
    process.exit(0);
  } catch (error) {
    console.error('예기치 않은 오류 발생:', error);
    process.exit(1);
  }
}

// 함수 실행
deleteExpiredReservations(); 