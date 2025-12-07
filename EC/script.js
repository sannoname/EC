// --- 輪播功能核心邏輯 (5 秒切換) ---
let slideIndex = 1;
let slideInterval; 

function showSlides(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const carouselInner = document.querySelector('.carousel-inner');
    
    if (!slides.length || !carouselInner) return;

    if (n > slides.length) { 
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // 計算位移
    const offset = -(slideIndex - 1) * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;

    // 更新指示點
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex - 1].classList.add('active');
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
    resetTimer();
}

function plusSlides() {
    slideIndex++;
    showSlides(slideIndex);
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(plusSlides, 5000); 
}
// --- 輪播功能核心邏輯結束 ---


// --- 頁面切換與頁籤邏輯 ---
function showPage(pageId) {
    // 隱藏所有頁面
    document.getElementById('home-page').classList.remove('visible');
    document.getElementById('product-list-page').classList.remove('visible');
    document.getElementById('product-detail-page').classList.remove('visible');
    document.getElementById('checkout-page').classList.remove('visible');
    document.getElementById('local-page').classList.remove('visible');
    document.getElementById('vendor-page').classList.remove('visible');
    
    // 顯示目標頁面
    document.getElementById(pageId).classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' }); 

    // 啟動/停止輪播
    if (pageId === 'home-page') {
        showSlides(slideIndex);
        resetTimer();
    } else {
         clearInterval(slideInterval);
    }
}

/**
 * 產品詳情頁籤切換邏輯
 */
function switchTab(event, contentId) {
    // 1. 移除所有按鈕的 active 狀態
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 2. 隱藏所有內容區塊
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 3. 為被點擊的按鈕添加 active 狀態
    event.currentTarget.classList.add('active');

    // 4. 顯示對應的內容區塊
    document.getElementById(contentId).classList.add('active');
}


// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 預設顯示首頁
    showPage('home-page');
    
    // 綁定導航事件
    document.getElementById('nav-home').onclick = () => showPage('home-page');
    document.getElementById('nav-products').onclick = () => showPage('product-list-page');
    document.getElementById('nav-local').onclick = () => showPage('local-page');
    document.getElementById('nav-vendor').onclick = () => showPage('vendor-page');
    document.getElementById('nav-detail').onclick = () => showPage('product-detail-page');
    document.getElementById('nav-cart').onclick = () => showPage('checkout-page');
    document.getElementById('nav-logo').onclick = () => showPage('home-page');
    
    // 產品卡片點擊跳轉 (首頁/列表頁卡片)
    document.querySelectorAll('.product-card').forEach(card => {
        card.onclick = () => showPage('product-detail-page');
    });
    // 產品詳情頁按鈕跳轉到結帳頁
     document.getElementById('btn-add-to-cart-detail').onclick = (e) => { e.preventDefault(); showPage('checkout-page'); };
     document.getElementById('btn-buy-now-detail').onclick = (e) => { e.preventDefault(); showPage('checkout-page'); };
});