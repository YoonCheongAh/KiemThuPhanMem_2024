/**
 * @jest-environment jsdom
 */

const { toast } = require('../js/toast-message');

// Thiết lập DOM giả lập
beforeEach(() => {
  document.body.innerHTML = '<div id="toast"></div>';
});

test('Hiển thị thông báo thành công', () => {
    toast({
      title: 'Success',
      message: 'Tạo tài khoản thành công',
      type: 'success',
      duration: 3000
    });
  
    const toastElement = document.querySelector('.toast--success');
    expect(toastElement).not.toBeNull();
    expect(toastElement.querySelector('.toast__title').textContent).toBe('Success');
    expect(toastElement.querySelector('.toast__msg').textContent.trim()).toBe('Tạo tài khoản thành công');
});

test('Tự động xóa thông báo sau thời gian duration', () => {
  jest.useFakeTimers();
  
  toast({
    title: 'Info',
    message: 'Đang tải...',
    type: 'info',
    duration: 3000
  });

  const toastElement = document.querySelector('.toast--info');
  expect(toastElement).not.toBeNull();

  // Chạy thời gian giả lập
  jest.advanceTimersByTime(4000);
  
  // Kiểm tra toast đã bị xóa
  expect(document.querySelector('.toast--info')).toBeNull();
  jest.useRealTimers();
});

test('Xóa thông báo khi nhấp vào nút đóng', () => {
  toast({
    title: 'Warning',
    message: 'Cảnh báo tài khoản',
    type: 'warning',
    duration: 3000
  });

  const toastElement = document.querySelector('.toast--warning');
  const closeButton = toastElement.querySelector('.fa-regular');

  // Giả lập sự kiện click vào nút đóng
  closeButton.click();

  // Kiểm tra toast đã bị xóa
  expect(document.querySelector('.toast--warning')).toBeNull();
});

test('Hiển thị thông báo lỗi với màu sắc và icon chính xác', () => {
  toast({
    title: 'Error',
    message: 'Lỗi hệ thống',
    type: 'error',
    duration: 3000
  });

  const toastElement = document.querySelector('.toast--error');
  const iconElement = toastElement.querySelector('.toast__icon i');
  const backgroundElement = toastElement.querySelector('.toast__background');

  // Kiểm tra icon và màu sắc
  expect(iconElement.className).toBe('fa-solid fa-bug');
  expect(backgroundElement.style.backgroundColor).toBe('rgb(255, 98, 67)');
});
