
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '10s', target: 5 },
        { duration: '5s', target: 0 },
    ],
};

export default function () {
    const res = http.get('https://autoelite-backend-v5sw.onrender.com/api/autos');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
