import dns from "node:dns";
import { MongoClient } from "mongodb";

const DB_NAME = "linknamu";

// 로컬 DNS가 SRV 조회(mongodb+srv://)를 거부하는 환경용 선택 옵션.
// 예: MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1 (설정하지 않으면 시스템 DNS 사용)
const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);
if (dnsServers?.length) {
  dns.setServers(dnsServers);
}

// 개발 모드의 핫 리로드 때마다 새 연결이 생기지 않도록 전역에 캐시한다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결 실패 시 캐시를 비워 다음 요청에서 다시 시도한다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(DB_NAME);
}
