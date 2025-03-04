// 图片处理工具类

// 阿里云OSS地址
const imageUrl = "https://safestride-bucket.oss-cn-hangzhou.aliyuncs.com/img"

// 将图片文件转换为图片 URL
export function image2Url(subPath) {
	return  imageUrl + subPath;
}

export function imageUrl2Base64(image, imageUrl) {
    return new Promise((resolve, reject) => {
        //image = new Image();
        image.crossOrigin = 'Anonymous'; // 解决跨域问题
        //image.src = `${imageUrl}?v=${Math.random()}`; // 添加随机数参数防止缓存
		image.src = imageUrl; //如果是本地图片替换为 image.src = imageUrl

        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            const quality = 0.8;
			// 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，
			// 因为压缩成png后base64的字符串可能比不转换前的长！
            const dataURL = canvas.toDataURL('image/jpeg', quality);
			console.log(dataURL);
            resolve(dataURL);
        };

        image.onerror = () => {
            reject(new Error('Failed to load the image'));
        };
    });
}

export function	getBase64(file) {
	return new Promise((resolve, reject)=>{
		let reader = new FileReader();
		let imgResult = "";
		reader.readAsDataURL(file);
		reader.onload = function () {
			imgResult = reader.result;
		}
		reader.onerror = function (error) {
			reject(error);
		}
		reader.onloadend = function () {
			resolve(imgResult);
		};
	})
}

// 示例：将 Base64 转换为 Blob
export function base642Blob(base64String) {
    const parts = base64String.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteCharacters = window.atob(parts[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export function getBlob(filePath) {
	return new Promise((resolve, reject) => {
		const fs = uni.getFileSystemManager();
		fs.readFile({
			filePath: filePath,
			encoding: 'binary', // 注意这里
			success: (res) => {
				if (res.errMsg === 'readFile:ok') {
					const blob = res.data;
					resolve(blob);
				} else {
					reject(res.errMsg);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

export const opts = {
	enableScroll: true,
	scrollPosition: "right",
	dataLabel: false,
	xAxis: {
		disableGrid: true,
		scrollShow: true,
		scrollAlign: "right",
		itemCount: 25,
		labelCount: 5,
		rotateLabel: true,
		fontSize: 10,
		marginTop: 2,
		title: "时间",
		titleOffsetX: -10
	},
	yAxis: {
		disableGrid: true,
		splitNumber: 3,
		title: "活动风险等级",
		titleOffsetY: 10,
		data: [
			{
				min: 0,
				max: 3
			}
		]
	},
	legend: {
		show: false
	},
	extra: {
		column: {
			type: "group",
			width: 5
		},
		tooltip: {
			legendShow: false
		}
	}
}
