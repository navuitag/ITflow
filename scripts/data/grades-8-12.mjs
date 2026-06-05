/** Dữ liệu bài học SGK Tin học 8–12 (KNTT). */

const C = {
  g8a: "Máy tính và cộng đồng",
  g8b: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
  g8c: "Đạo đức, pháp luật và văn hóa trong môi trường số",
  g8d: "Ứng dụng tin học",
  g8e: "Giải quyết vấn đề với sự trợ giúp của máy tính",
  g8f: "Hướng nghiệp với tin học",
  g9a: "Máy tính và cộng đồng",
  g9b: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
  g9c: "Đạo đức, pháp luật và văn hóa trong môi trường số",
  g9d: "Ứng dụng tin học",
  g9e: "Giải quyết vấn đề với sự trợ giúp của máy tính",
  g9f: "Hướng nghiệp với tin học",
  g10a: "Máy tính và xã hội tri thức",
  g10b: "Mạng máy tính và Internet",
  g10c: "Đạo đức, pháp luật và văn hóa trong môi trường số",
  g10d: "Ứng dụng tin học",
  g10e: "Giải quyết vấn đề với sự trợ giúp của máy tính",
  g10f: "Hướng nghiệp với tin học",
  g11a: "Máy tính và xã hội tri thức",
  g11b: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
  g11c: "Đạo đức, pháp luật và văn hóa trong môi trường số",
  g11d: "Giới thiệu các hệ cơ sở dữ liệu",
  g11e: "Hướng nghiệp với tin học",
  g11f: "Kĩ thuật lập trình",
  g11g: "Thực hành tạo và khai thác cơ sở dữ liệu",
  g11h: "Phần mềm chỉnh sửa ảnh và làm video",
  g12a: "Máy tính và xã hội tri thức",
  g12b: "Mạng máy tính và Internet",
  g12c: "Đạo đức, pháp luật và văn hóa trong môi trường số",
  g12d: "Giải quyết vấn đề với sự trợ giúp của máy tính",
  g12e: "Hướng nghiệp với tin học",
  g12f: "Mạng máy tính và Internet",
  g12g: "Giải quyết vấn đề với sự trợ giúp của máy tính",
  g12h: "Ứng dụng tin học"
};

const L = (id, title, chapter, ci, desc, pre = [], book) => {
  const row = [id, title, chapter, ci, desc, pre];
  if (book) row.push(book);
  return row;
};

export const grade8Lessons = [
  L("g8_a01", "Bài 1. Lược sử công cụ tính toán", C.g8a, 1, "Tóm tắt lịch sử phát triển công cụ tính từ cổ đại đến máy tính hiện đại."),
  L("g8_b02", "Bài 2. Thông tin trong môi trường số", C.g8b, 2, "Nhận biết thông tin số, định dạng tệp và kho tri thức trên Internet.", ["g8_a01"]),
  L("g8_b03", "Bài 3. Thực hành: Khai thác thông tin số", C.g8b, 2, "Tìm, tải và tổ chức thông tin số có ích cho học tập.", ["g8_b02"]),
  L("g8_c04", "Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ số", C.g8c, 3, "Ứng xử có trách nhiệm, tôn trọng bản quyền và văn hóa số.", ["g8_b03"]),
  L("g8_d05", "Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế", C.g8d, 4, "Mô hình hóa bài toán thực tế bằng bảng tính và công thức.", ["g8_c04"]),
  L("g8_d06", "Bài 6. Sắp xếp và lọc dữ liệu", C.g8d, 4, "Sắp xếp hàng/cột và lọc dữ liệu theo điều kiện.", ["g8_d05"]),
  L("g8_d07", "Bài 7. Trình bày dữ liệu bằng biểu đồ", C.g8d, 4, "Tạo biểu đồ cột, tròn phù hợp dữ liệu.", ["g8_d06"]),
  L("g8_d08a", "Bài 8A. Danh sách liệt kê và hình ảnh trong văn bản", C.g8d, 4, "Tạo danh sách có thứ tự/không thứ tự và chèn ảnh.", ["g8_d07"]),
  L("g8_d09a", "Bài 9A. Đầu trang, chân trang cho văn bản", C.g8d, 4, "Thiết lập header/footer, số trang trong văn bản.", ["g8_d08a"]),
  L("g8_d10a", "Bài 10A. Định dạng nâng cao cho trang chiếu", C.g8d, 4, "Bố cục slide, hiệu ứng và chuyển trang nâng cao.", ["g8_d09a"]),
  L("g8_d11a", "Bài 11A. Bản mẫu tạo bài trình chiếu", C.g8d, 4, "Dùng template có sẵn để tạo bài trình chiếu nhanh.", ["g8_d10a"]),
  L("g8_d08b", "Bài 8B. Phần mềm chỉnh sửa ảnh", C.g8d, 4, "Làm quen giao diện và công cụ chỉnh sửa ảnh.", ["g8_d07"]),
  L("g8_d09b", "Bài 9B. Thay đổi khung hình, kích thước ảnh", C.g8d, 4, "Cắt, thay đổi kích thước và tỷ lệ ảnh.", ["g8_d08b"]),
  L("g8_d10b", "Bài 10B. Thêm văn bản, hiệu ứng cho ảnh", C.g8d, 4, "Chèn chữ, bộ lọc và hiệu ứng lên ảnh.", ["g8_d09b"]),
  L("g8_d11b", "Bài 11B. Thực hành tổng hợp chỉnh sửa ảnh", C.g8d, 4, "Hoàn thiện sản phẩm ảnh số theo rubric SGK.", ["g8_d10b"]),
  L("g8_e12", "Bài 12. Từ thuật toán đến chương trình", C.g8e, 5, "Chuyển thuật toán mô tả bằng lời sang chương trình.", ["g8_d07"]),
  L("g8_e13", "Bài 13. Biểu diễn dữ liệu", C.g8e, 5, "Biến và kiểu dữ liệu trong lập trình trực quan.", ["g8_e12"]),
  L("g8_e14", "Bài 14. Cấu trúc điều khiển", C.g8e, 5, "Tuần tự, rẽ nhánh và lặp trong chương trình.", ["g8_e13"]),
  L("g8_e15", "Bài 15. Gỡ lỗi", C.g8e, 5, "Nhận biết lỗi logic/cú pháp và sửa chương trình.", ["g8_e14"]),
  L("g8_f16", "Bài 16. Tin học với nghề nghiệp", C.g8f, 6, "Khám phá nghề liên quan tin học và kỹ năng cần có.", ["g8_e15"])
];

export const grade9Lessons = [
  L("g9_a01", "Bài 1. Thế giới kĩ thuật số", C.g9a, 1, "Bối cảnh xã hội số và vai trò công nghệ trong đời sống."),
  L("g9_b02", "Bài 2. Thông tin trong giải quyết vấn đề", C.g9b, 2, "Thu thập và chọn thông tin phục vụ giải quyết vấn đề.", ["g9_a01"]),
  L("g9_b03", "Bài 3. Thực hành: Đánh giá chất lượng thông tin", C.g9b, 2, "Tiêu chí đánh giá độ tin cậy nguồn thông tin.", ["g9_b02"]),
  L("g9_c04", "Bài 4. Vấn đề pháp lí khi sử dụng dịch vụ Internet", C.g9c, 3, "Quyền, nghĩa vụ và rủi ro pháp lý trên mạng.", ["g9_b03"]),
  L("g9_d05", "Bài 5. Tìm hiểu phần mềm mô phỏng", C.g9d, 4, "Làm quen phần mềm mô phỏng trong học tập khoa học.", ["g9_c04"]),
  L("g9_d06", "Bài 6. Thực hành: Khai thác phần mềm mô phỏng", C.g9d, 4, "Vận hành mô phỏng và ghi nhận kết quả.", ["g9_d05"]),
  L("g9_d07", "Bài 7. Trình bày thông tin trong trao đổi và hợp tác", C.g9d, 4, "Nguyên tắc trình bày khi làm việc nhóm trực tuyến.", ["g9_d06"]),
  L("g9_d08", "Bài 8. Thực hành: Công cụ trực quan trình bày thông tin", C.g9d, 4, "Dùng công cụ trực quan hỗ trợ thảo luận nhóm.", ["g9_d07"]),
  L("g9_d09a", "Bài 9A. Công cụ xác thực dữ liệu", C.g9d, 4, "Ràng buộc dữ liệu nhập trong bảng tính.", ["g9_d08"]),
  L("g9_d10a", "Bài 10A. Hàm COUNTIF", C.g9d, 4, "Đếm ô theo điều kiện bằng COUNTIF.", ["g9_d09a"]),
  L("g9_d11a", "Bài 11A. Hàm SUMIF", C.g9d, 4, "Tính tổng có điều kiện bằng SUMIF.", ["g9_d10a"]),
  L("g9_d12a", "Bài 12A. Hàm IF", C.g9d, 4, "Rẽ nhánh tính toán trong bảng tính với IF.", ["g9_d11a"]),
  L("g9_d13a", "Bài 13A. Hoàn thiện bảng tính quản lí tài chính gia đình", C.g9d, 4, "Dự án bảng tính tài chính tổng hợp.", ["g9_d12a"]),
  L("g9_d09b", "Bài 9B. Chức năng phần mềm làm video", C.g9d, 4, "Giao diện và công cụ cơ bản phần mềm dựng video.", ["g9_d08"]),
  L("g9_d10b", "Bài 10B. Chuẩn bị dữ liệu và dựng video", C.g9d, 4, "Chuẩn bị clip, ảnh, âm thanh cho video.", ["g9_d09b"]),
  L("g9_d11b", "Bài 11B. Dựng video theo kịch bản", C.g9d, 4, "Cắt ghép và sắp xếp cảnh theo kịch bản.", ["g9_d10b"]),
  L("g9_d12b", "Bài 12B. Hoàn thành việc dựng video", C.g9d, 4, "Hoàn thiện timeline và hiệu ứng chuyển cảnh.", ["g9_d11b"]),
  L("g9_d13b", "Bài 13B. Biên tập và xuất video", C.g9d, 4, "Biên tập, xuất file video định dạng phù hợp.", ["g9_d12b"]),
  L("g9_e14", "Bài 14. Giải quyết vấn đề", C.g9e, 5, "Mô hình hóa bài toán và thiết kế thuật toán.", ["g9_d08"]),
  L("g9_e15", "Bài 15. Bài toán tin học", C.g9e, 5, "Phân loại bài toán và lựa chọn cấu trúc dữ liệu phù hợp.", ["g9_e14"]),
  L("g9_e16", "Bài 16. Thực hành: Lập chương trình máy tính", C.g9e, 5, "Viết chương trình tổng hợp từ thuật toán đã thiết kế.", ["g9_e15"]),
  L("g9_f17", "Bài 17. Tin học và thế giới nghề nghiệp", C.g9f, 6, "Định hướng nghề nghiệp liên quan CNTT.", ["g9_e16"])
];

export const grade10Lessons = [
  L("g10_a01", "Bài 1. Thông tin và xử lý thông tin", C.g10a, 1, "Khái niệm thông tin, dữ liệu và quy trình xử lý."),
  L("g10_a02", "Bài 2. Thiết bị thông minh và tin học với xã hội", C.g10a, 1, "IoT, thiết bị thông minh và tác động xã hội.", ["g10_a01"]),
  L("g10_a03", "Bài 3. Kiểu dữ liệu và dữ liệu văn bản", C.g10a, 1, "Kiểu số, chuỗi, logic trong lập trình.", ["g10_a02"]),
  L("g10_a04", "Bài 4. Hệ nhị phân và dữ liệu số nguyên", C.g10a, 1, "Chuyển đổi nhị phân – thập phân; biểu diễn số nguyên.", ["g10_a03"]),
  L("g10_a05", "Bài 5. Dữ liệu lôgic", C.g10a, 1, "Giá trị True/False và phép toán logic.", ["g10_a04"]),
  L("g10_a06", "Bài 6. Dữ liệu âm thanh và hình ảnh", C.g10a, 1, "Số hóa âm thanh, ảnh; định dạng tệp đa phương tiện.", ["g10_a05"]),
  L("g10_a07", "Bài 7. Thực hành sử dụng thiết bị số thông dụng", C.g10a, 1, "Thao tác smartphone, máy ảnh số an toàn.", ["g10_a06"]),
  L("g10_b08", "Bài 8. Mạng máy tính trong cuộc sống hiện đại", C.g10b, 2, "Mạng có dây/không dây trong gia đình và trường học.", ["g10_a07"]),
  L("g10_b09", "Bài 9. An toàn trên không gian mạng", C.g10b, 2, "Mã hóa, mật khẩu mạnh và bảo vệ tài khoản.", ["g10_b08"]),
  L("g10_b10", "Bài 10. Thực hành khai thác tài nguyên trên Internet", C.g10b, 2, "Tìm và đánh giá tài nguyên học tập trực tuyến.", ["g10_b09"]),
  L("g10_c11", "Bài 11. Ứng xử trên môi trường số và bản quyền", C.g10c, 3, "Ứng xử văn minh và nghĩa vụ tôn trọng bản quyền.", ["g10_b10"]),
  L("g10_d12", "Bài 12. Phần mềm thiết kế đồ họa", C.g10d, 4, "Làm quen vector/raster và công cụ đồ họa.", ["g10_c11"]),
  L("g10_d13", "Bài 13. Bổ sung các đối tượng đồ họa", C.g10d, 4, "Vẽ hình cơ bản, chèn icon và clipart.", ["g10_d12"]),
  L("g10_d14", "Bài 14. Đối tượng đường và văn bản", C.g10d, 4, "Đường thẳng, đường cong và text trên canvas.", ["g10_d13"]),
  L("g10_d15", "Bài 15. Hoàn thiện hình ảnh đồ họa", C.g10d, 4, "Xuất file ảnh và hoàn thiện poster theo rubric.", ["g10_d14"]),
  L("g10_e16", "Bài 16. Ngôn ngữ lập trình Python", C.g10e, 5, "Làm quen Python và môi trường lập trình.", ["g10_d15"]),
  L("g10_e17", "Bài 17. Biến và lệnh gán", C.g10e, 5, "Khai báo biến, gán giá trị trong Python.", ["g10_e16"]),
  L("g10_e18", "Bài 18. Lệnh vào ra đơn giản", C.g10e, 5, "input(), print() và định dạng xuất.", ["g10_e17"]),
  L("g10_e19", "Bài 19. Câu lệnh rẽ nhánh if", C.g10e, 5, "if, elif, else trong Python.", ["g10_e18"]),
  L("g10_e20", "Bài 20. Câu lệnh lặp for", C.g10e, 5, "Vòng lặp for với range và iterable.", ["g10_e19"]),
  L("g10_e21", "Bài 21. Câu lệnh lặp while", C.g10e, 5, "Vòng lặp while và điều kiện dừng.", ["g10_e20"]),
  L("g10_e22", "Bài 22. Kiểu dữ liệu danh sách", C.g10e, 5, "List, indexing, slicing trong Python.", ["g10_e21"]),
  L("g10_e23", "Bài 23. Lệnh làm việc với danh sách", C.g10e, 5, "append, insert, remove và duyệt list.", ["g10_e22"]),
  L("g10_e24", "Bài 24. Xâu kí tự", C.g10e, 5, "Chuỗi và thao tác cơ bản trên string.", ["g10_e23"]),
  L("g10_e25", "Bài 25. Lệnh làm việc với xâu kí tự", C.g10e, 5, "len, split, join và tìm chuỗi con.", ["g10_e24"]),
  L("g10_e26", "Bài 26. Hàm trong Python", C.g10e, 5, "Định nghĩa hàm def và return.", ["g10_e25"]),
  L("g10_e27", "Bài 27. Tham số của hàm", C.g10e, 5, "Tham số, đối số và giá trị mặc định.", ["g10_e26"]),
  L("g10_e28", "Bài 28. Phạm vi của biến", C.g10e, 5, "Biến cục bộ, toàn cục trong hàm.", ["g10_e27"]),
  L("g10_e29", "Bài 29. Nhận biết lỗi chương trình", C.g10e, 5, "SyntaxError, RuntimeError và traceback.", ["g10_e28"]),
  L("g10_e30", "Bài 30. Kiểm thử và gỡ lỗi", C.g10e, 5, "Test case và kỹ thuật debug cơ bản.", ["g10_e29"]),
  L("g10_e31", "Bài 31. Thực hành viết chương trình đơn giản", C.g10e, 5, "Hoàn thiện chương trình Python theo đề bài.", ["g10_e30"]),
  L("g10_e32", "Bài 32. Ôn tập lập trình Python", C.g10e, 5, "Ôn tập biến, rẽ nhánh, lặp, list, hàm.", ["g10_e31"]),
  L("g10_f33", "Bài 33. Nghề thiết kế đồ họa máy tính", C.g10f, 6, "Định hướng nghề thiết kế đồ họa số.", ["g10_e32"]),
  L("g10_f34", "Bài 34. Nghề phát triển phần mềm", C.g10f, 6, "Định hướng nghề lập trình viên.", ["g10_f33"])
];

const grade11CommonLessons = [
  L("g11_a01", "Bài 1. Hệ điều hành", C.g11a, 1, "Vai trò HĐH và quản lý tài nguyên máy tính."),
  L("g11_a02", "Bài 2. Thực hành sử dụng hệ điều hành", C.g11a, 1, "Thao tác file, process và cài đặt cơ bản.", ["g11_a01"]),
  L("g11_a03", "Bài 3. Phần mềm nguồn mở và phần mềm Internet", C.g11a, 1, "Phần mềm mã nguồn mở và ứng dụng web.", ["g11_a02"]),
  L("g11_a04", "Bài 4. Bên trong máy tính", C.g11a, 1, "CPU, RAM, bus và nguyên lý hoạt động.", ["g11_a03"]),
  L("g11_a05", "Bài 5. Kết nối máy tính với thiết bị số", C.g11a, 1, "Cổng USB, Bluetooth và driver thiết bị.", ["g11_a04"]),
  L("g11_b06", "Bài 6. Lưu trữ và chia sẻ tệp trên Internet", C.g11b, 2, "Cloud storage và chia sẻ quyền truy cập.", ["g11_a05"]),
  L("g11_b07", "Bài 7. Thực hành tìm kiếm thông tin trên Internet", C.g11b, 2, "Kỹ thuật tìm kiếm nâng cao và đánh giá nguồn.", ["g11_b06"]),
  L("g11_b08", "Bài 8. Thực hành email và mạng xã hội", C.g11b, 2, "Email, mạng xã hội an toàn và hiệu quả.", ["g11_b07"]),
  L("g11_c09", "Bài 9. Giao tiếp an toàn trên Internet", C.g11c, 3, "Bảo mật thông tin khi giao tiếp trực tuyến.", ["g11_b08"]),
  L("g11_d10", "Bài 10. Lưu trữ dữ liệu phục vụ quản lí", C.g11d, 4, "Tổ chức dữ liệu phục vụ quản lý.", ["g11_c09"]),
  L("g11_d11", "Bài 11. Cơ sở dữ liệu", C.g11d, 4, "Khái niệm CSDL, bảng, bản ghi và trường.", ["g11_d10"]),
  L("g11_d12", "Bài 12. Hệ quản trị CSDL và hệ CSDL", C.g11d, 4, "DBMS và mô hình lưu trữ dữ liệu.", ["g11_d11"]),
  L("g11_d13", "Bài 13. Cơ sở dữ liệu quan hệ", C.g11d, 4, "Khóa chính, khóa ngoại và quan hệ bảng.", ["g11_d12"]),
  L("g11_d14", "Bài 14. SQL – ngôn ngữ truy vấn", C.g11d, 4, "SELECT, INSERT, UPDATE cơ bản.", ["g11_d13"]),
  L("g11_d15", "Bài 15. Bảo mật và an toàn CSDL", C.g11d, 4, "Phân quyền, sao lưu và bảo vệ dữ liệu.", ["g11_d14"]),
  L("g11_e16", "Bài 16. Công việc quản trị CSDL", C.g11e, 5, "Nghề quản trị cơ sở dữ liệu.", ["g11_d15"])
];

const grade11CsLessons = [
  L("g11_f17", "Bài 17. Dữ liệu mảng một chiều và hai chiều", C.g11f, 6, "Mảng 1D, 2D trong lập trình.", ["g11_e16"], "KNTT-CS"),
  L("g11_f18", "Bài 18. Thực hành dữ liệu mảng", C.g11f, 6, "Thao tác duyệt và xử lý mảng.", ["g11_f17"], "KNTT-CS"),
  L("g11_f19", "Bài 19. Bài toán tìm kiếm", C.g11f, 6, "Thuật toán tìm kiếm tuần tự và nhị phân.", ["g11_f18"], "KNTT-CS"),
  L("g11_f20", "Bài 20. Thực hành bài toán tìm kiếm", C.g11f, 6, "Cài đặt tìm kiếm trên mảng.", ["g11_f19"], "KNTT-CS"),
  L("g11_f21", "Bài 21. Thuật toán sắp xếp đơn giản", C.g11f, 6, "Sắp xếp chọn, chèn, nổi bọt.", ["g11_f20"], "KNTT-CS"),
  L("g11_f22", "Bài 22. Thực hành bài toán sắp xếp", C.g11f, 6, "Cài đặt sắp xếp trên mảng.", ["g11_f21"], "KNTT-CS"),
  L("g11_f23", "Bài 23. Kiểm thử và đánh giá chương trình", C.g11f, 6, "Test case và đánh giá kết quả.", ["g11_f22"], "KNTT-CS"),
  L("g11_f24", "Bài 24. Độ phức tạp thời gian thuật toán", C.g11f, 6, "Big-O cơ bản: O(n), O(n²), O(log n).", ["g11_f23"], "KNTT-CS"),
  L("g11_f25", "Bài 25. Thực hành xác định độ phức tạp", C.g11f, 6, "Ước lượng độ phức tạp thuật toán.", ["g11_f24"], "KNTT-CS"),
  L("g11_f26", "Bài 26. Làm mịn dần trong thiết kế chương trình", C.g11f, 6, "Top-down design và stepwise refinement.", ["g11_f25"], "KNTT-CS"),
  L("g11_f27", "Bài 27. Thực hành thiết kế làm mịn dần", C.g11f, 6, "Áp dụng làm mịn dần cho bài toán.", ["g11_f26"], "KNTT-CS"),
  L("g11_f28", "Bài 28. Thiết kế chương trình theo mô đun", C.g11f, 6, "Chia chương trình thành module/hàm.", ["g11_f27"], "KNTT-CS"),
  L("g11_f29", "Bài 29. Thực hành thiết kế mô đun", C.g11f, 6, "Viết chương trình đa module.", ["g11_f28"], "KNTT-CS"),
  L("g11_f30", "Bài 30. Thiết lập thư viện cho chương trình", C.g11f, 6, "Import module và thư viện chuẩn.", ["g11_f29"], "KNTT-CS"),
  L("g11_f31", "Bài 31. Thực hành thiết lập thư viện", C.g11f, 6, "Dùng thư viện trong dự án nhỏ.", ["g11_f30"], "KNTT-CS")
];

const grade11IctLessons = [
  L("g11ict_g17", "Bài 17. Quản trị cơ sở dữ liệu trên máy tính", C.g11g, 6, "Làm quen giao diện quản trị CSDL trên máy (Access/MySQL…).", ["g11_e16"], "KNTT-ICT"),
  L("g11ict_g18", "Bài 18. Thực hành xác định cấu trúc bảng và các trường khóa", C.g11g, 6, "Thiết kế bảng: khóa chính, khóa ngoại.", ["g11ict_g17"], "KNTT-ICT"),
  L("g11ict_g19", "Bài 19. Thực hành tạo lập cơ sở dữ liệu và các bảng", C.g11g, 6, "Tạo CSDL mới và các bảng theo mô hình.", ["g11ict_g18"], "KNTT-ICT"),
  L("g11ict_g20", "Bài 20. Thực hành tạo lập các bảng có khóa ngoài", C.g11g, 6, "Liên kết bảng bằng khóa ngoại.", ["g11ict_g19"], "KNTT-ICT"),
  L("g11ict_g21", "Bài 21. Thực hành cập nhật và truy xuất dữ liệu các bảng", C.g11g, 6, "INSERT, UPDATE, SELECT trên bảng đơn.", ["g11ict_g20"], "KNTT-ICT"),
  L("g11ict_g22", "Bài 22. Thực hành cập nhật bảng dữ liệu có tham chiếu", C.g11g, 6, "Cập nhật dữ liệu có ràng buộc tham chiếu.", ["g11ict_g21"], "KNTT-ICT"),
  L("g11ict_g23", "Bài 23. Thực hành truy xuất dữ liệu qua liên kết các bảng", C.g11g, 6, "JOIN/truy vấn nhiều bảng.", ["g11ict_g22"], "KNTT-ICT"),
  L("g11ict_g24", "Bài 24. Thực hành sao lưu dữ liệu", C.g11g, 6, "Sao lưu và khôi phục CSDL.", ["g11ict_g23"], "KNTT-ICT"),
  L("g11ict_g25", "Bài 25. Phần mềm chỉnh sửa ảnh", C.g11h, 7, "Giao diện và công cụ chỉnh sửa ảnh chuyên nghiệp.", ["g11ict_g24"], "KNTT-ICT"),
  L("g11ict_g26", "Bài 26. Công cụ tinh chỉnh màu sắc và công cụ chọn", C.g11h, 7, "Chọn vùng, chỉnh sáng/tương phản/màu.", ["g11ict_g25"], "KNTT-ICT"),
  L("g11ict_g27", "Bài 27. Công cụ vẽ và một số ứng dụng", C.g11h, 7, "Bút vẽ, lớp và ứng dụng đồ họa.", ["g11ict_g26"], "KNTT-ICT"),
  L("g11ict_g28", "Bài 28. Tạo ảnh động", C.g11h, 7, "GIF/animation từ nhiều khung hình.", ["g11ict_g27"], "KNTT-ICT"),
  L("g11ict_g29", "Bài 29. Khám phá phần mềm làm phim", C.g11h, 7, "Timeline, clip và hiệu ứng trong phần mềm dựng phim.", ["g11ict_g28"], "KNTT-ICT"),
  L("g11ict_g30", "Bài 30. Biên tập phim", C.g11h, 7, "Cắt ghép, âm thanh và chữ trên video.", ["g11ict_g29"], "KNTT-ICT"),
  L("g11ict_g31", "Bài 31. Thực hành tạo phim hoạt hình", C.g11h, 7, "Hoàn thiện phim hoạt hình ngắn theo kịch bản.", ["g11ict_g30"], "KNTT-ICT")
];

export const grade11Lessons = [...grade11CommonLessons, ...grade11CsLessons, ...grade11IctLessons];

const grade12CommonLessons = [
  L("g12_a01", "Bài 1. Làm quen với Trí tuệ nhân tạo", C.g12a, 1, "Khái niệm AI và ứng dụng trong đời sống."),
  L("g12_a02", "Bài 2. AI trong khoa học và đời sống", C.g12a, 1, "Ví dụ AI: nhận dạng, gợi ý, xe tự lái.", ["g12_a01"]),
  L("g12_b03", "Bài 3. Thiết bị mạng thông dụng", C.g12b, 2, "Switch, router, modem và cáp mạng.", ["g12_a02"]),
  L("g12_b04", "Bài 4. Giao thức mạng", C.g12b, 2, "TCP/IP, HTTP và vai trò giao thức.", ["g12_b03"]),
  L("g12_b05", "Bài 5. Thực hành chia sẻ tài nguyên trên mạng", C.g12b, 2, "Chia sẻ tệp và máy in trong mạng LAN.", ["g12_b04"]),
  L("g12_c06", "Bài 6. Giao tiếp và ứng xử trong không gian mạng", C.g12c, 3, "Ứng xử và bảo vệ danh tiếng số.", ["g12_b05"]),
  L("g12_d07", "Bài 7. HTML và cấu trúc trang web", C.g12d, 4, "Thẻ HTML cơ bản: html, head, body, p, h1.", ["g12_c06"]),
  L("g12_d08", "Bài 8. Định dạng văn bản HTML", C.g12d, 4, "Thẻ strong, em, br và đoạn văn.", ["g12_d07"]),
  L("g12_d09", "Bài 9. Danh sách và bảng HTML", C.g12d, 4, "ul, ol, table, tr, td.", ["g12_d08"]),
  L("g12_d10", "Bài 10. Tạo liên kết", C.g12d, 4, "Thẻ a href và liên kết nội/ngoại.", ["g12_d09"]),
  L("g12_d11", "Bài 11. Chèn đa phương tiện và iframe", C.g12d, 4, "img, audio, video và iframe.", ["g12_d10"]),
  L("g12_d12", "Bài 12. Tạo biểu mẫu", C.g12d, 4, "form, input, textarea, button.", ["g12_d11"]),
  L("g12_d13", "Bài 13. Khái niệm và vai trò CSS", C.g12d, 4, "Tách style; selector và rule CSS.", ["g12_d12"]),
  L("g12_d14", "Bài 14. Định dạng văn bản bằng CSS", C.g12d, 4, "font, color, text-align trong CSS.", ["g12_d13"]),
  L("g12_d15", "Bài 15. Màu chữ và nền CSS", C.g12d, 4, "color, background-color, background-image.", ["g12_d14"]),
  L("g12_d16", "Bài 16. Định dạng khung CSS", C.g12d, 4, "border, margin, padding, box model.", ["g12_d15"]),
  L("g12_d17", "Bài 17. Mức ưu tiên bộ chọn CSS", C.g12d, 4, "Specificity và cascade.", ["g12_d16"]),
  L("g12_d18", "Bài 18. Thực hành tổng hợp thiết kế trang web", C.g12d, 4, "Hoàn thiện trang web HTML+CSS.", ["g12_d17"]),
  L("g12_e19", "Bài 19. Dịch vụ sửa chữa và bảo trì máy tính", C.g12e, 5, "Nghề kỹ thuật viên máy tính.", ["g12_d18"]),
  L("g12_e20", "Bài 20. Nghề quản trị CNTT", C.g12e, 5, "Nhóm nghề quản trị hệ thống.", ["g12_e19"]),
  L("g12_e21", "Bài 21. Hội thảo hướng nghiệp", C.g12e, 5, "Tổng kết định hướng nghề nghiệp tin học.", ["g12_e20"])
];

const grade12CsLessons = [
  L("g12_f22", "Bài 22. Tìm hiểu thiết bị mạng", C.g12f, 6, "Router, switch, access point và topology mạng.", ["g12_e21"], "KNTT-CS"),
  L("g12_f23", "Bài 23. Đường truyền mạng và ứng dụng", C.g12f, 6, "Cáp quang, Wi-Fi, băng thông và ứng dụng thực tế.", ["g12_f22"], "KNTT-CS"),
  L("g12_f24", "Bài 24. Sơ bộ về thiết kế mạng", C.g12f, 6, "Sơ đồ mạng LAN và lựa chọn thiết bị cho trường/lớp.", ["g12_f23"], "KNTT-CS"),
  L("g12_g25", "Bài 25. Làm quen với Học máy", C.g12g, 7, "Khái niệm học máy, dữ liệu huấn luyện và mô hình.", ["g12_f24"], "KNTT-CS"),
  L("g12_g26", "Bài 26. Làm quen với Khoa học dữ liệu", C.g12g, 7, "Big data, pipeline dữ liệu và vai trò khoa học dữ liệu.", ["g12_g25"], "KNTT-CS"),
  L("g12_g27", "Bài 27. Máy tính và Khoa học dữ liệu", C.g12g, 7, "Công cụ phân tích dữ liệu và trực quan hóa cơ bản.", ["g12_g26"], "KNTT-CS"),
  L("g12_g28", "Bài 28. Thực hành trích rút thông tin và tri thức", C.g12g, 7, "Khai thác dữ liệu, tìm mẫu và rút ra tri thức.", ["g12_g27"], "KNTT-CS"),
  L("g12_g29", "Bài 29. Mô phỏng trong giải quyết vấn đề", C.g12g, 7, "Mô hình mô phỏng và tham số hóa bài toán.", ["g12_g28"], "KNTT-CS"),
  L("g12_g30", "Bài 30. Ứng dụng mô phỏng trong giáo dục", C.g12g, 7, "Phần mềm mô phỏng hỗ trợ dạy học khoa học.", ["g12_g29"], "KNTT-CS")
];

const grade12IctLessons = [
  L("g12ict_g22", "Bài 22. Thực hành kết nối các thiết bị số", C.g12a, 6, "Bluetooth, thiết bị thông minh và kết nối IoT cơ bản.", ["g12_e21"], "KNTT-ICT"),
  L("g12ict_h23", "Bài 23. Chuẩn bị xây dựng trang web", C.g12h, 7, "Kế hoạch, wireframe và cấu trúc trang theo SGK.", ["g12ict_g22"], "KNTT-ICT"),
  L("g12ict_h24", "Bài 24. Xây dựng phần đầu trang web", C.g12h, 7, "Thẻ header, tiêu đề và phần đầu trang HTML.", ["g12ict_h23"], "KNTT-ICT"),
  L("g12ict_h25", "Bài 25. Xây dựng phần thân và chân trang web", C.g12h, 7, "Nội dung chính, footer và bố cục trang.", ["g12ict_h24"], "KNTT-ICT"),
  L("g12ict_h26", "Bài 26. Liên kết và thanh điều hướng", C.g12h, 7, "Menu nav, liên kết nội bộ và liên kết ngoài.", ["g12ict_h25"], "KNTT-ICT"),
  L("g12ict_h27", "Bài 27. Biểu mẫu trên trang web", C.g12h, 7, "Form, input, textarea và nút gửi dữ liệu.", ["g12ict_h26"], "KNTT-ICT"),
  L("g12ict_h28", "Bài 28. Thực hành tổng hợp", C.g12h, 7, "Hoàn thiện website theo rubric SGK nhánh ứng dụng.", ["g12ict_h27"], "KNTT-ICT")
];

export const grade12Lessons = [...grade12CommonLessons, ...grade12CsLessons, ...grade12IctLessons];
