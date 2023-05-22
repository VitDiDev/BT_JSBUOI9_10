var mangNV = [];
document.querySelector('#btnThemNV').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.hoTen = document.querySelector('#name').value;
    nhanVien.Email = document.querySelector('#email').value;
    nhanVien.matKhau = document.querySelector('#password').value;
    nhanVien.ngayLam = document.querySelector('#datepicker').value;
    nhanVien.luongCoBan = document.querySelector('#luongCB').value;
    nhanVien.chucVu = document.querySelector('#chucvu').value;
    nhanVien.giolam = document.querySelector('#gioLam').value;

    var valid = true; 
    valid &= kiemTraRong(nhanVien.taiKhoan, '#tbTKNV', 'Tài khoản') 
    & kiemTraRong(nhanVien.hoTen, '#tbTen', 'Họ tên') 
    & kiemTraRong(nhanVien.Email, '#tbEmail', 'Email') 
    & kiemTraRong(nhanVien.matKhau, '#tbMatKhau', 'Mật khẩu') 
    & kiemTraRong(nhanVien.ngayLam, '#tbNgay', 'Ngày làm') 
    & kiemTraRong(nhanVien.luongCoBan, '#tbLuongCB', 'Lương cơ bản') 
    & kiemTraRong(nhanVien.chucVu, '#tbChucVu', 'Chức vụ') 
    & kiemTraRong(nhanVien.giolam, '#tbGiolam', 'Giờ làm');
    valid &= kiemTraDoDai(nhanVien.taiKhoan, '#dodai_taikhoan', 'Tài khoản', 4, 6) 
    & kiemTraEmail(nhanVien.Email, '#error_email', "Email ") 
    & kiemTraDoDai(nhanVien.matKhau, '#dodai_matkhau', 'Mật khẩu', 6, 10) 
    & kiemTraGiaTri(nhanVien.luongCoBan, '#giatri_luongCB', 'Lương cơ bản', 1000000, 20000000) 
    & kiemTraHopLe(nhanVien.chucVu, '#chucvu_hopLe', 'Chức vụ') 
    & kiemTraGiaTri(nhanVien.giolam, '#kiemtra_giolam', 'Giờ làm', 80, 200);

    if (!valid) {
        return;
    }
    mangNV.push(nhanVien);
    renderMangNhanVien(mangNV);
    luuLocalStorage();


}

function renderMangNhanVien(arrayNhanVien) {
    var html = '';
    for (index = 0; index < arrayNhanVien.length; index++) {
        var nhanVien = arrayNhanVien[index];
        nhanVien.tinhtongLuong = function () {
            var tongLuong = '';
            var viTri = nhanVien.chucVu;
            var ketQua = 0;
            if (viTri === 'Sếp') {
                ketQua = Number(nhanVien.luongCoBan) * 3;
            } else if (viTri === 'Trưởng phòng') {
                ketQua = Number(nhanVien.luongCoBan) * 2;
            } else if (viTri === 'Nhân viên') {
                ketQua = Number(nhanVien.luongCoBan);
            };
            tongLuong = ketQua + ' VNĐ';
            return tongLuong;
        }

        nhanVien.xetXepLoai = function () {
            var xepLoai = '';
            var gioLam = nhanVien.giolam;
            if (gioLam >= 192) {
                xepLoai = 'Nhân viên xuất sắc';
            }
            else if (gioLam >= 176 & gioLam < 192) {
                xepLoai = 'Nhân viên giỏi';
            }
            else if (gioLam >= 160 & gioLam < 176) {
                xepLoai = 'Nhân viên khá';
            }
            else if (gioLam < 160) {
                xepLoai = 'Nhân viên trung bình';
            }
            return xepLoai;

        };

        html += `
        <tr>
        <td>${nhanVien.taiKhoan} </td>
        <td>${nhanVien.hoTen} </td>
        <td>${nhanVien.Email} </td>
        <td> ${nhanVien.ngayLam} </td>
        <td>${nhanVien.chucVu} </td>
        <td> ${(nhanVien.tinhtongLuong())}</td>
        <td>${(nhanVien.xetXepLoai())} </td>
        <td> <button class="btn btn-danger" onclick ="xoaNhanVien('${nhanVien.taiKhoan}')"> Xoá</button>
        <button class="btn btn-primary" data-toggle="modal"
        data-target="#myModal" onclick ="chinhSua('${nhanVien.taiKhoan}')"> Chỉnh sửa</button>
         </td>
        
        </tr>

        `;
    }

    document.querySelector('#tableDanhSach').innerHTML = html;

    return html;

}


function luuLocalStorage() {
    var sMangNV = JSON.stringify(mangNV);
    localStorage.setItem('mangNV', sMangNV);
};

function layLocalStorage() {
    if (localStorage.getItem('mangNV')) {
        var sMangNV = localStorage.getItem('mangNV');
        mangNV = JSON.parse(sMangNV);
        renderMangNhanVien(mangNV);
    }
}

function xoaNhanVien(taiKhoanClick) {
    var indexDel = mangNV.findIndex(nhanVien => nhanVien.taiKhoan === taiKhoanClick);
    if (indexDel != -1) {
        mangNV.splice(indexDel, 1);
    }
    renderMangNhanVien(mangNV);
    luuLocalStorage();

}

function chinhSua(taikhoanClick) {
    var indexEdit = mangNV.findIndex(nhanVien => nhanVien.taiKhoan === taikhoanClick);
    var nhanVienEdit = mangNV[indexEdit];
    document.querySelector('#tknv').disabled = true;
    document.querySelector('#tknv').value = nhanVienEdit.taiKhoan;
    document.querySelector('#name').value = nhanVienEdit.hoTen;
    document.querySelector('#email').value = nhanVienEdit.Email;
    document.querySelector('#password').value = nhanVienEdit.matKhau;
    document.querySelector('#datepicker').value = nhanVienEdit.ngayLam;
    document.querySelector('#luongCB').value = nhanVienEdit.luongCoBan;
    document.querySelector('#chucvu').value = nhanVienEdit.chucVu;
    document.querySelector('#gioLam').value = nhanVienEdit.giolam;

}

document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVienupdate = new NhanVien ();
    nhanVienupdate.taiKhoan = document.querySelector('#tknv').value;
    nhanVienupdate.hoTen = document.querySelector('#name').value;
    nhanVienupdate.Email = document.querySelector('#email').value;
    nhanVienupdate.matKhau = document.querySelector('#password').value;
    nhanVienupdate.ngayLam = document.querySelector('#datepicker').value;
    nhanVienupdate.luongCoBan = document.querySelector('#luongCB').value;
    nhanVienupdate.chucVu = document.querySelector('#chucvu').value;
    nhanVienupdate.giolam = document.querySelector('#gioLam').value;

    var valid = true; 
    valid &= kiemTraRong(nhanVienupdate.taiKhoan, '#tbTKNV', 'Tài khoản') & 
    kiemTraRong(nhanVienupdate.hoTen, '#tbTen', 'Họ tên') 
        & kiemTraRong(nhanVienupdate.Email, '#tbEmail', 'Email') 
        & kiemTraRong(nhanVienupdate.matKhau, '#tbMatKhau', 'Mật khẩu')
        & kiemTraRong(nhanVienupdate.ngayLam, '#tbNgay', 'Ngày làm') 
        & kiemTraRong(nhanVienupdate.luongCoBan, '#tbLuongCB', 'Lương cơ bản') 
        & kiemTraRong(nhanVienupdate.chucVu, '#tbChucVu', 'Chức vụ') 
        & kiemTraRong(nhanVienupdate.giolam, '#tbGiolam', 'Giờ làm');
    valid &= kiemTraTatCaSo(nhanVienupdate.taiKhoan, '#So_taikhoan', 'Tài khoản') 
        & kiemTraDoDai(nhanVienupdate.taiKhoan, '#dodai_taikhoan', 'Tài khoản', 4, 6) 
        & kiemTraTatCaKyTu(nhanVienupdate.hoTen, '#kytu_hoten', "Họ tên ") 
        & kiemTraEmail(nhanVienupdate.Email, '#error_email', "Email ") 
        & kiemTraDoDai(nhanVienupdate.matKhau, '#dodai_matkhau', 'Mật khẩu', 6, 10) 
        & kiemTraGiaTri(nhanVienupdate.luongCoBan, '#giatri_luongCB', 'Lương cơ bản', 1000000, 200000000) 
        & kiemTraHopLe(nhanVienupdate.chucVu, '#chucvu_hopLe', 'Chức vụ') 
        & kiemTraGiaTri(nhanVienupdate.giolam, '#kiemtra_giolam', 'Giờ làm', 80, 200);

    if (!valid) {
        return;
    }

   var indexEdit = mangNV.findIndex(nv => nv.taiKhoan === nv.taiKhoan);

mangNV[indexEdit].hoTen = nhanVienupdate.hoTen;
mangNV[indexEdit].Email = nhanVienupdate.Email;
mangNV[indexEdit].matKhau = nhanVienupdate.matKhau;
mangNV[indexEdit].ngayLam = nhanVienupdate.ngayLam;
mangNV[indexEdit].luongCoBan = nhanVienupdate.luongCoBan;
mangNV[indexEdit].chucVu = nhanVienupdate.chucVu;
mangNV[indexEdit].giolam = nhanVienupdate.giolam;

 renderMangNhanVien(mangNV);
document.querySelector('#tknv').disabled =false;
 luuLocalStorage(); 
    
}

function sortNV () {

    var findNV = document.querySelector('#searchName').value;
    var mangNVsort = [];

for (index =0; index < mangNV.length; index++) {
        var xepLoai = '';
        var gioLam = mangNV[index].giolam;
        if (gioLam >= 192) {
            xepLoai = 'Nhân viên xuất sắc';
        }
        else if (gioLam >= 176 & gioLam < 192) {
            xepLoai = 'Nhân viên giỏi';
        }
        else if (gioLam >= 160 & gioLam < 176) {
            xepLoai = 'Nhân viên khá';
        }
        else if (gioLam < 160) {
            xepLoai = 'Nhân viên trung bình';
        };
    

if (findNV === xepLoai) {
    mangNVsort.push(mangNV[index]);
}

}
renderMangNhanVien(mangNVsort);
}

window.onload = function () {
    layLocalStorage();
}

console.log('Nhan viên',mangNV);



