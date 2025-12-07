// client/src/pages/members.tsx
import { useEffect, useState } from "react";
import { Mail, ExternalLink, User, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMembers, getLabInfo } from "@/lib/staticApi";

type Member = {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
  homepage?: string;
  degree: string;
  joinedAt?: string;
  status?: string;
  bio?: string;
};

type LabInfo = {
  principalInvestigator?: string;
  piTitle?: string;
  piEmail?: string;
  piPhone?: string;
  piPhoto?: string;
  description?: string;
  address?: string;
} | null;

export default function MembersPage() {
  const [membersByLevel, setMembersByLevel] = useState<{
    masters: Member[];
    bachelors: Member[];
    phd: Member[];
    other: Member[];
  }>({ masters: [], bachelors: [], phd: [], other: [] });
  const [labInfo, setLabInfo] = useState<LabInfo>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [members, lab] = await Promise.all([
          getMembers(),
          getLabInfo()
        ]);
        setMembersByLevel(members);
        setLabInfo(lab);
      } catch (e) {
        console.error("Failed to load data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const MemberCard = ({ member }: { member: Member }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="text-center">
          <img
            src={member.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300"}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-gray-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300";
            }}
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
          <Badge variant="secondary" className="mb-2">{member.degree}</Badge>
          <div className="text-center space-y-2 mb-3">
            {member.status && (
              <Badge variant="outline" className="mb-2">{member.status}</Badge>
            )}
            {member.joinedAt && (
              <p className="text-xs text-gray-500">{member.joinedAt}</p>
            )}
          </div>
          {member.bio && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
          )}
          <div className="flex justify-center space-x-2">
            {member.email && (
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${member.email}`}>
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            )}
            {member.homepage && (
              <Button variant="outline" size="sm" asChild>
                <a href={member.homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-12 bg-blue-400 rounded w-64 mx-auto mb-4"></div>
                <div className="h-6 bg-blue-400 rounded w-96 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Laboratory Members</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Professor Section */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg [container-type:inline-size]">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-bold text-gray-900">지도교수</h2>
            </CardHeader>
            <CardContent>
              {labInfo ? (
                <div className="grid items-start gap-6 md:grid-cols-[auto,1fr]">
                  <div className="flex justify-center md:justify-start">
                    {labInfo.piPhoto ? (
                      <img
                        src={labInfo.piPhoto}
                        alt={labInfo.principalInvestigator}
                        className="rounded-full object-cover border-4 border-white shadow-lg aspect-square"
                        style={{ width: "clamp(96px, 22cqw, 176px)", height: "clamp(96px, 22cqw, 176px)" }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300";
                        }}
                      />
                    ) : (
                      <div className="w-[clamp(96px,22cqw,176px)] h-[clamp(96px,22cqw,176px)] rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center border-4 border-white shadow-lg">
                        <User className="h-20 w-20 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{labInfo.principalInvestigator}</h3>
                      <p className="text-lg text-blue-700 font-medium">{labInfo.piTitle}</p>
                    </div>
                    {labInfo.piEmail && (
                      <div className="flex items-center text-gray-700">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        <a href={`mailto:${labInfo.piEmail}`} className="hover:text-blue-600 transition-colors">
                          {labInfo.piEmail}
                        </a>
                      </div>
                    )}
                    {labInfo.piPhone && (
                      <div className="flex items-center text-gray-700">
                        <Phone className="h-5 w-5 mr-2 text-blue-600" />
                        <span>{labInfo.piPhone}</span>
                      </div>
                    )}
                    {labInfo.address && (
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        <span>{labInfo.address}</span>
                      </div>
                    )}
                    {labInfo.description && (
                      <div className="mt-4">
                        <div
                          className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: labInfo.description }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <p className="text-lg text-gray-700">등록된 교수님 정보가 없습니다.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Members List */}
        {membersByLevel.masters.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Master's Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membersByLevel.masters.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        )}

        {membersByLevel.bachelors.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Bachelor's Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membersByLevel.bachelors.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        )}

        {membersByLevel.phd.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">PhD Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membersByLevel.phd.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        )}

        {membersByLevel.other.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membersByLevel.other.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        )}

        {membersByLevel.masters.length === 0 &&
          membersByLevel.bachelors.length === 0 &&
          membersByLevel.phd.length === 0 &&
          membersByLevel.other.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Members Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Laboratory members will be displayed here once they are added.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
